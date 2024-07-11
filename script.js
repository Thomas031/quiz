document.addEventListener("DOMContentLoaded", function() {
    const conversationContainer = document.getElementById('conversation');
    const messageBox = document.getElementById('messageBox');
    const userInput = document.getElementById('userInput');
    const submitButton = document.getElementById('submit');
    const inputContainer = document.getElementById('inputContainer');

    const messages = [
        { text: "Salut ! Comment ça va ?", responses: ["Bien", "Pas bien", "Bof"] },
        { text: "Quelle est ta couleur préférée ?", responses: ["Rouge", "Bleu", "Vert", "Jaune"] },
        { text: "Quel est ton animal préféré ?", responses: ["Chat", "Chien", "Oiseau", "Poisson"] },
        { text: "Es-tu seul chez toi ?", responses: ["Oui", "Non"], scaryResponse: "Es-tu sûr d'être seul ? Je pense avoir vu quelqu'un derrière toi." },
        { text: "As-tu éteint les lumières ?", responses: ["Oui", "Non"], scaryResponse: "Peux-tu vérifier les lumières ? Il semble y avoir une ombre derrière toi." },
        { text: "Entends-tu des bruits étranges ?", responses: ["Oui", "Non"], scaryResponse: "Es-tu certain de ne rien entendre ? On dirait qu'il y a quelqu'un qui se rapproche." }
    ];

    let currentMessageIndex = 0;

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        conversationContainer.appendChild(messageElement);
        conversationContainer.scrollTop = conversationContainer.scrollHeight;
    }

    function displayMessageBox(text, callback) {
        messageBox.textContent = text;
        messageBox.classList.remove('hidden');
        conversationContainer.classList.add('hidden');
        inputContainer.classList.add('hidden');

        setTimeout(() => {
            messageBox.classList.add('hidden');
            conversationContainer.classList.remove('hidden');
            inputContainer.classList.remove('hidden');
            if (callback) callback();
        }, 2000);
    }

    function handleUserInput() {
        const userText = userInput.value;
        if (userText.trim() === '') return;

        addMessage(userText, 'user');
        userInput.value = '';

        setTimeout(() => {
            handleBotResponse(userText);
        }, 1000);
    }

    function handleBotResponse(userText) {
        const currentMessage = messages[currentMessageIndex];

        if (currentMessage.responses.includes(userText)) {
            if (currentMessage.scaryResponse && userText.toLowerCase() === 'oui') {
                displayMessageBox(currentMessage.scaryResponse, () => {
                    addMessage(currentMessage.scaryResponse, 'bot');
                    addScreamer();
                });
            } else {
                currentMessageIndex++;
                displayMessageBox(getNextMessage(), () => {
                    addMessage(getNextMessage(), 'bot');
                });
            }
        } else {
            displayMessageBox("Je ne comprends pas. Peux-tu répéter ?", () => {
                addMessage("Je ne comprends pas. Peux-tu répéter ?", 'bot');
            });
        }
    }

    function getNextMessage() {
        return messages[currentMessageIndex]?.text || "Merci d'avoir discuté avec moi !";
    }

    function addScreamer() {
        setTimeout(() => {
            alert("BOO!");
        }, 2000);
    }

    submitButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleUserInput();
        }
    });

    displayMessageBox(messages[currentMessageIndex].text, () => {
        addMessage(messages[currentMessageIndex].text, 'bot');
    });
});
