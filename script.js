document.addEventListener("DOMContentLoaded", function() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    const questions = [
        {
            question: "Quelle est ta couleur préférée ?",
            answers: {
                a: "Rouge",
                b: "Bleu",
                c: "Vert",
                d: "Jaune"
            },
            correctAnswer: "a",
            level: "banal"
        },
        {
            question: "Quel est ton animal préféré ?",
            answers: {
                a: "Chat",
                b: "Chien",
                c: "Oiseau",
                d: "Poisson"
            },
            correctAnswer: "b",
            level: "banal"
        },
        {
            question: "Es-tu seul chez toi ?",
            answers: {
                a: "Oui",
                b: "Non"
            },
            correctAnswer: "a",
            followUp: {
                a: "Es-tu sûr d'être seul ? Veux-tu vérifier encore une fois ?",
                b: null
            },
            level: "effrayant"
        },
        {
            question: "As-tu éteint les lumières ?",
            answers: {
                a: "Oui",
                b: "Non"
            },
            correctAnswer: "b",
            followUp: {
                a: null,
                b: "Peux-tu vérifier les lumières ?"
            },
            level: "effrayant"
        },
        {
            question: "Entends-tu des bruits étranges ?",
            answers: {
                a: "Oui",
                b: "Non"
            },
            correctAnswer: "a",
            level: "effrayant"
        },
        // Ajout de questions supplémentaires
        {
            question: "Aimes-tu les films d'horreur ?",
            answers: {
                a: "Oui",
                b: "Non"
            },
            correctAnswer: "a",
            level: "banal"
        },
        {
            question: "Quelle heure est-il ?",
            answers: {
                a: "Matin",
                b: "Après-midi",
                c: "Soir",
                d: "Nuit"
            },
            correctAnswer: "d",
            level: "effrayant"
        },
        {
            question: "Sais-tu où sont tes clés ?",
            answers: {
                a: "Oui",
                b: "Non"
            },
            correctAnswer: "a",
            level: "effrayant"
        },
        {
            question: "As-tu entendu cela ?",
            answers: {
                a: "Oui",
                b: "Non"
            },
            correctAnswer: "a",
            level: "effrayant"
        },
    ];

    let currentQuestionIndex = 0;

    function buildQuiz() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            const answers = [];
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${currentQuestionIndex}" value="${letter}">
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            quizContainer.innerHTML = `
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>
            `;
            submitButton.onclick = () => saveAnswerAndProceed();
        } else {
            showResults();
        }
    }

    function saveAnswerAndProceed() {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        const answerContainer = answerContainers[0];
        const selector = `input[name=question${currentQuestionIndex}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer) {
            const currentQuestion = questions[currentQuestionIndex];
            const followUpQuestion = currentQuestion.followUp ? currentQuestion.followUp[userAnswer] : null;

            if (currentQuestion.level === "effrayant" && userAnswer === currentQuestion.correctAnswer) {
                // Afficher un screamer
                setTimeout(() => {
                    alert("BOO!");
                }, 500);
            }

            if (followUpQuestion) {
                quizContainer.innerHTML = `
                    <div class="question"> ${followUpQuestion} </div>
                    <div class="answers">
                        <label>
                            <input type="radio" name="followUp${currentQuestionIndex}" value="yes">
                            Oui
                        </label>
                        <label>
                            <input type="radio" name="followUp${currentQuestionIndex}" value="no">
                            Non
                        </label>
                    </div>
                `;
                submitButton.onclick = () => saveFollowUpAndProceed();
            } else {
                currentQuestionIndex++;
                buildQuiz();
            }
        } else {
            alert("Veuillez sélectionner une réponse.");
        }
    }

    function saveFollowUpAndProceed() {
        currentQuestionIndex++;
        buildQuiz();
    }

    function showResults() {
        resultsContainer.innerHTML = `Merci d'avoir complété le quiz.`;
    }

    buildQuiz();
});
