const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');

const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const quizResultContainer = document.getElementById('quiz-result');
quizResultContainer.style.display = 'none'; 
const quizHeader = document.getElementById('quiz-header');

const quizStats = document.getElementById('quiz-stats');
quizStats.style.display = 'none';

const questionImage = document.getElementById('quiz-image');

const initialQuestion = document.getElementById('initial-questions');
const remainingQuestion = document.getElementById('remaining-question');
const showCorrectAnswer = document.getElementById('correct-answer');
const showWrongAnswer = document.getElementById('wrong-answer');
const showTimer = document.getElementById('timer');

let currentQuestionIndex = 0;
let correctAnswer = 0;
let wrongAnswer = 0;
let questions = [];
let timerInterval;


async function getQuiz() {
    const url = "https://adriannnicu.github.io/sdp-api/questions.json";
    const response = await fetch(url);
    const data = await response.json();

    questions = shuffleArray(data);

    questions = questions.slice(0, 3);
    startQuiz();
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const startQuiz = () => {
    currentQuestionIndex = 0;
    correctAnswer = 0;
    showQuestion();
    startButton.style.display = 'none';
    quizContainer.style.display = 'block';
    quizStats.style.display = 'flex';
    quizHeader.style.display = 'none';

    startTimer(5 * 60);
}

const startTimer = (durationInSeconds) => {
    let timer = durationInSeconds;
    timerInterval = setInterval(function () {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        showTimer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (--timer < 0) {
            clearInterval(timerInterval);
            endRejectedQuiz();
        }
    }, 1000);
};

const showQuestion = () => {
    initialQuestion.textContent = questions.length;
    remainingQuestion.textContent = questions.length - currentQuestionIndex;

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    questionImage.src = currentQuestion.image;

    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('btn-option');
        button.addEventListener('click', () => checkAnswer(index));
        optionsContainer.appendChild(button);
    })
}

const checkAnswer = (optionIndex) => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options[optionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
        correctAnswer++;
        showCorrectAnswer.textContent = correctAnswer;
    } else if (selectedOption !== currentQuestion.correctAnswer) {
        wrongAnswer++;
        showWrongAnswer.textContent = wrongAnswer;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
       return endPassedQuiz();
    }

    if (wrongAnswer === 2) {
        return endRejectedQuiz();
    }
}

const endRejectedQuiz = () => {
    clearInterval(timerInterval);
    startButton.style.display = 'block';
    quizContainer.style.display = 'none';
    quizResultContainer.style.display = 'block';
    quizResultContainer.style.backgroundColor = 'rgb(220 38 38)';
    quizStats.style.display = 'none';
    quizResultContainer.textContent = `Testul a luat sfârşit. Aţi fost declarat RESPINS la examenul de teorie.`;
}

const endPassedQuiz = () => {
    clearInterval(timerInterval);
    startButton.style.display = 'block';
    quizContainer.style.display = 'none';
    quizResultContainer.style.display = 'block';
    quizResultContainer.style.backgroundColor = 'rgb(22 163 74)';
    quizStats.style.display = 'none';
    quizResultContainer.textContent = `Felicitari! Aţi fost declarat ADMIS la examenul de teorie.`;
}

startButton.addEventListener('click', function() {
    getQuiz();
});