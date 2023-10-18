// creates the questions and answers for the quiz with a check for the correct answer
const questions = [
    {
        question: "What does Javascript do?",
        answers: [
            {text: "A: Lets users interact with the app", correct: false},
            {text: "B: Edit html elements", correct: false},
            {text: "C: Edit CSS styling elements", correct: false},
            {text: "D: All of the above", correct: true},

        ]
    },
    {
        question: "What does API stand for?",
        answers: [
            {text: "A: Application programming interlace", correct: false},
            {text: "B: Application programming interface", correct: true},
            {text: "C: Artifact programmer interface", correct: false},
            {text: "D: Artifiical progamming intelligence", correct: false},

        ]  
    },
    {
        question: "What is the value of a Javascript library such as Jquery?",
        answers: [
            {text: "A: There is no value", correct: false},
            {text: "B: Libraries shouldn't be used because that's cheating!", correct: false},
            {text: "C: Helps to provide templated code for easy app building", correct: true},
            {text: "D: None of the above", correct: false},

        ]  
    },
    {
        question: "What is full stack development?",
        answers: [
            {text: "A: Combining two half-stacks", correct: false},
            {text: "B: Another term for a graphic designer", correct: false},
            {text: "C: None of these answers are correct", correct: false},
            {text: "D: Developing using front-end and back-end tools to power an app.", correct: true},

        ]  
    }
]
//create the necessary variables used in my functions 
const questionEl = document.getElementById ("question");
const answerButtons = document.getElementById ("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById ("start-btn");
const answerSection = document.querySelector(".answer-section");
const paragraphEl = document.querySelector("main section p");
const submitQuizResults = document.getElementById ("submit-score");
const timerElement = document.getElementById('timer');
let currentQuestionIndex = 0;
let score = 0;
let restartButton;
let scoreboardButton;
let timerInterval;
let remainingTime = 45;
nextButton.addEventListener('click', nextButtonAction);
startButton.addEventListener('click',startQuiz);

// runs the hideBeforeStart function when the webpage intially loads
window.onload = hideBeforeStart();

//function that hides the quiz buttons used on later pages of the quiz so only the start button appears
function hideBeforeStart() {
        nextButton.style.display = "none";
        answerButtons.style.display = "none";
        submitQuizResults.style.display = "none";
        answerSection.style.display = "none";
    }

// starts the countdown timer and checks the time left to show the end score if the time has hit 0 seconds
function startCountdownTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    updateTimerDisplay();  
    timerInterval = setInterval(function() {
        remainingTime -= 1; 
        updateTimerDisplay();
        
        if (remainingTime <= 0) {
            timerElement.textContent =  "Quiz ended";
            clearInterval(timerInterval);  
            showScore();  
        }
    }, 1000); 
}

// creates the timer display message
function updateTimerDisplay() {
    timerElement.textContent = remainingTime + " seconds left";
}

// upon clicking the start button, the quiz begins by displaying the first Q&As and starts the timer
function startQuiz (){
    currentQuestionIndex = 0;
    score = 0;
    showQuestion ();
    console.log ("started quiz");
    startButton.classList.add("hide");
    startButton.style.display = "none";
    answerButtons.style.display = "block";
    answerSection.style.display = "block";
    answerSection.innerText = "";
    answerButtons.addEventListener("click", function() {
        nextButton.classList.add("display");
    });
    startCountdownTimer();
}

// separate function used specifically for when restarting a quiz
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
    remainingTime = 45;

    startCountdownTimer();

}

//displays questions and answers
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

//upon selecting an answer, display the next button
function answerChosen (event) {
    selectAnswer(event);
    nextButton.style.display = "block";
    document.querySelector (selectAnswer);
    }

//after clicking the next button, reset the Q&A
function resetState(){
    nextButton.style.display = "block";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    answerSection.innerHTML = "";
    }};

//after selecting an answer, check the boolean value stored in the answer array and display correct/wrong answer response    
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
        remainingTime -= 10;
        updateTimerDisplay();

    }
    Array.from (answerButtons.children).forEach(function(button){
        if (button.dataset.correct === "true"){
            button.classList.add ("correct-selection")
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
};

// after quiz ends, show score and create submit score and show scoreboard buttons
function showScore () {
    resetState();
    questionEl.innerHTML = `You scored ${score} out of ${questions.length}.`;
    answerSection.style.display = "none";
    nextButton.style.display = "none";
    paragraphEl.innerHTML = "All done, thanks for playing! Add your initials and your score to be added to the playerboard!";
    clearInterval(timerInterval); 
    const form = document.createElement('form');
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.id = 'score-input';
    inputField.placeholder = 'Eg: TY - 3';
    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Submit';
    submitBtn.type = 'submit';
    submitBtn.style.background = 'linear-gradient(to right, #eecda3, #ef629f)';
    submitBtn.style.boxShadow = 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px';
    submitBtn.style.display = 'flex';
    submitBtn.style.marginTop = '5px';
    submitBtn.style.fontSize = '18px';
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

//after selecting next, increase the answer array index to display the next question
function nextButtonAction () {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore ();
    }
}

//after clicking submit, run the submitScore function
submitQuizResults.addEventListener("click", submitScore);

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

//creates the scoreboard and saves it to the browser localstorage 
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

//only displays the start button upon
hideBeforeStart();