document.addEventListener("DOMContentLoaded", function() {
    const conversationContainer = document.getElementById('conversation');
    const userInput = document.getElementById('userInput');
    const submitButton = document.getElementById('submit');

    const messages = [
        "Salut ! Comment ça va ?",
        "Quelle est ta couleur préférée ?",
        "Quel est ton animal préféré ?",
        "Es-tu seul chez toi ?",
        "As-tu éteint les lumières ?",
        "Entends-tu des bruits étranges ?"
    ];

    const scaryResponses = {
        "Es-tu seul chez toi ?": "Es-tu sûr d'être seul ? Je pense avoir vu quelqu'un derrière toi.",
        "As-tu éteint les lumières ?": "Peux-tu vérifier les lumières ? Il semble y avoir une ombre derrière toi.",
        "Entends-tu des bruits étranges ?": "Es-tu certain de ne rien entendre ? On dirait qu'il y a quelqu'un qui se rapproche."
    };

    let currentMessageIndex = 0;

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        conversationContainer.appendChild(messageElement);
        conversationContainer.scrollTop = conversationContainer.scrollHeight;
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
        const responseText = scaryResponses[currentMessage] || getNextMessage();

        addMessage(responseText, 'bot');

        if (scaryResponses[currentMessage] && userText.toLowerCase() === 'oui') {
            addScreamer();
        } else {
            currentMessageIndex++;
        }
    }

    function getNextMessage() {
        currentMessageIndex++;
        return messages[currentMessageIndex] || "Merci d'avoir discuté avec moi !";
    }

    function addScreamer() {
        setTimeout(() => {
            alert("BOO!");
        }, 500);
    }

    submitButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleUserInput();
        }
    });

    addMessage(messages[currentMessageIndex], 'bot');
});
