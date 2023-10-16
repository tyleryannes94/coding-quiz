// Use this section for writing out the pseudocode for this assignment:
// - Need to create functionality upon clicking one of the buttons
// - Need to make sure to display a message if correct and another message if incorrect
// - Need to create a display pay with instructions before starting the quiz
// - Need to create logic to display the time left in the navbar
// - Need to create logic where wrong answer substracts 10 seconds from time left 
// - Need to create logic with text input for initials and save the score displayed + initials as input 
// - Create a localStorage solution to save prior answers to a scoreboard
// - Add "scoreboard" as a button with a link in the navbar
// Suggestions: use "let" and "const" instead of "var"

const questions = [
    {
        question: "What does Javascript do?",
        answers: [
            {text: "A: Allows users to interact with your app", correct: false},
            {text: "B: Edit html elements", correct: false},
            {text: "C: Edit CSS styling elements", correct: false},
            {text: "D: All of the above", correct: true},

        ]
    },
    {
        question: "What does API stand for?",
        answers: [
            {text: "Application programming interlace", correct: false},
            {text: "Application programming interface", correct: true},
            {text: "Artifact programmer interface", correct: false},
            {text: "Artifical progamming intelligence", correct: false},

        ]  
    },
    {
        question: "What is the value of a Javascript library such as Jquery?",
        answers: [
            {text: "There is no value", correct: false},
            {text: "Libraries shouldn't be used because that's cheating!", correct: false},
            {text: "Helps to provide templated code for easy app building", correct: true},
            {text: "None of the above", correct: false},

        ]  
    },
    {
        question: "What is full stack development?",
        answers: [
            {text: "Combining two half-stacks", correct: false},
            {text: "Another term for a graphic designer", correct: false},
            {text: "None of these answers are correct", correct: false},
            {text: "Developing using front-end and back-end tools to power an app.", correct: true},

        ]  
    }
]

const questionEl = document.getElementById ("question");
const answerButtons = document.getElementById ("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById ("start-btn");
startButton.addEventListener('click',startQuiz);
const answerSection = document.querySelector(".answer-section");
const paragraphEl = document.querySelector("main section p");
const submitQuizResults = document.getElementById ("submit-score");

nextButton.addEventListener('click', nextButtonAction);


let currentQuestionIndex = 0;
let score = 0;
let restartButton;
let scoreboardButton;

window.onload = hideBeforeStart();
function hideBeforeStart() {
        nextButton.style.display = "none";
        answerButtons.style.display = "none";
        answerButtons.classList.add ("hide");
        submitQuizResults.style.display = "none";

    }

function startQuiz (){
    currentQuestionIndex = 0;
    score = 0;
    showQuestion ();
    console.log ("started quiz");
    startButton.classList.add("hide");
    startButton.style.display = "none";
    answerButtons.style.display = "block";
    // answerSection.style.display = "block";
    answerSection.innerText = "";
    answerButtons.addEventListener("click", function() {
        nextButton.classList.add("display");
    });

    // const formEl = document.querySelector('form');
    // if(formEl) {
    //     formEl.remove();
    // }
    // if(restartButton) {
    //     restartButton.style.display = "none";
    // }

    // if(scoreboardButton) {
    //     scoreboardButton.style.display = "none";
    // }
    // if (paragraphEl){
    //     paragraphEl.innerHTML ="";
    // }
}

function restartQuiz (){
    currentQuestionIndex = 0;
    score = 0;
    showQuestion ();
    console.log ("restarted quiz");
    startButton.style.display = "none";
    answerButtons.style.display = "block";
    answerSection.style.display = "block";
    answerSection.innerText = "";
    answerButtons.addEventListener("click", function() {
        nextButton.classList.add("display");
    });

    const formEl = document.querySelector('form');
    if(formEl) {
        formEl.remove();
    }
    if(restartButton) {
        restartButton.style.display = "none";
    }

    if(scoreboardButton) {
        scoreboardButton.style.display = "none";
    }
    if (paragraphEl){
        paragraphEl.innerHTML = "";
    }
}

function showQuestion (){
    resetState();
    nextButton.style.display = "none";

    let currentQuestion = questions [currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionEl.innerHTML = questionNum + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(function(answer) {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", answerChosen);
        answerButtons.appendChild(button);
    });
}

function answerChosen (event) {
    selectAnswer(event);
    nextButton.style.display = "block";
    document.querySelector (selectAnswer);
    }

function resetState(){
    nextButton.style.display = "block";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    answerSection.innerHTML = "";
    }};


function selectAnswer (chosenAnswer){
    const selectBtn = chosenAnswer.target;
    const correctAnswer = selectBtn.dataset.correct === "true";
    if (correctAnswer){
        selectBtn.classList.add ("correct-selection");
        answerSection.innerText = "Answer: Correct!";
        score++;
    } else {
        selectBtn.classList.add ("wrong-selection");
        answerSection.innerText = "Answer: Wrong :/";

    }
    Array.from (answerButtons.children).forEach(function(button){
        if (button.dataset.correct === "true"){
            button.classList.add ("correct-selection")
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
};

function showScore () {
    resetState();
    questionEl.innerHTML = `You scored ${score} out of ${questions.length}.`;
    answerSection.style.display = "none";
    nextButton.style.display = "none";
    paragraphEl.innerHTML = "All done, thanks for playing! Add your initials and your score to be added to the playerboard!";

    // Create and show the form here
    const form = document.createElement('form');

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.id = 'score-input';
    inputField.placeholder = 'Eg: TY - 3';

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Submit';

    form.appendChild(inputField);
    form.appendChild(submitBtn);

    const parentElement = submitQuizResults.parentNode;
    parentElement.insertBefore(form, submitQuizResults);

    form.addEventListener('submit', saveScore);

    if (!restartButton) {
        restartButton = document.createElement('button');
        restartButton.textContent = 'Restart Quiz';
        restartButton.addEventListener('click', restartQuiz);
        parentElement.appendChild(restartButton);
    }
    restartButton.style.display = "block"; 

    if (!scoreboardButton) {
        scoreboardButton = document.createElement('button');
        scoreboardButton.textContent = 'See Scoreboard';
        scoreboardButton.addEventListener('click', displayScoreboard);
        parentElement.appendChild(scoreboardButton);
    }
    scoreboardButton.style.display = "block";
}

function nextButtonAction () {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore ();
    }
}

submitQuizResults.addEventListener("click", submitScore);

// function recordScore(event) {
//     event.preventDefault ();
//     const form = document.createElement('form');
    
//     const inputValue = document.getElementById('score-input').value;
//     if (inputValue) {
//         localStorage.setItem('score', inputValue);
//         alert('Score saved!');
//     } else {
//         alert('Please enter your initials and score!');
//     }
// }

function saveScore (event){
       event.preventDefault();
       const inputValue = document.getElementById('score-input').value;
       if (inputValue) {
           let scores = JSON.parse(localStorage.getItem('scores')) || [];
           scores.push(inputValue);
           localStorage.setItem('scores', JSON.stringify(scores));
           alert('Score saved!');
       } else {
           alert('Please enter your initials and score!');
       }
}
    
function displayScoreboard() {
    resetState();
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    questionEl.innerHTML = 'Scoreboard';
    nextButton.style.display = "none";

    const scoreList = document.createElement('ul');
    scores.forEach(score => {
        let li = document.createElement('li');
        li.textContent = score;
        scoreList.appendChild(li);
    });

    paragraphEl.innerHTML = ""; 
    paragraphEl.appendChild(scoreList);
}


hideBeforeStart();