document.addEventListener("DOMContentLoaded", function() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    const questions = [
        {
            question: "Es-tu seul chez toi ?",
            answers: {
                a: "Oui",
                b: "Non"
            },
            followUp: {
                a: "Es-tu sûr d'être seul ? Veux-tu vérifier encore une fois ?",
                b: null
            }
        },
        {
            question: "As-tu éteint les lumières ?",
            answers: {
                a: "Oui",
                b: "Non"
            },
            followUp: {
                a: null,
                b: null
            }
        },
        {
            question: "As-tu fermé la porte à clé ?",
            answers: {
                a: "Oui",
                b: "Non"
            },
            followUp: {
                a: null,
                b: null
            }
        },
        {
            question: "Entends-tu des bruits étranges ?",
            answers: {
                a: "Oui",
                b: "Non"
            },
            followUp: {
                a: null,
                b: null
            }
        }
    ];

    let userAnswers = {};

    function buildQuiz(currentQuestionIndex = 0) {
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
            submitButton.onclick = () => saveAnswerAndProceed(currentQuestionIndex);
        } else {
            showResults();
        }
    }

    function saveAnswerAndProceed(currentQuestionIndex) {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        const answerContainer = answerContainers[0];
        const selector = `input[name=question${currentQuestionIndex}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer) {
            userAnswers[currentQuestionIndex] = userAnswer;
            const followUpQuestion = questions[currentQuestionIndex].followUp[userAnswer];
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
                submitButton.onclick = () => saveFollowUpAndProceed(currentQuestionIndex);
            } else {
                buildQuiz(currentQuestionIndex + 1);
            }
        } else {
            alert("Veuillez sélectionner une réponse.");
        }
    }

    function saveFollowUpAndProceed(currentQuestionIndex) {
        buildQuiz(currentQuestionIndex + 1);
    }

    function showResults() {
        resultsContainer.innerHTML = `Merci d'avoir complété le quiz.`;
    }

    buildQuiz();
});
