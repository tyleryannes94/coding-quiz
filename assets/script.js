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
        question: "Question #1",
        answers: [
            {text: Answer 1, correct: true},
            {text: Answer 2, correct: false},
            {text: Answer 3, correct: false},
            {text: Answer 4, correct: false},

        ]
    },
    {
        question: "Question #2",
        answers: [
            {text: Answer 1, correct: false},
            {text: Answer 2, correct: true},
            {text: Answer 3, correct: false},
            {text: Answer 4, correct: false},

        ]  
    },
    {
        question: "Question #3",
        answers: [
            {text: Answer 1, correct: false},
            {text: Answer 2, correct: false},
            {text: Answer 3, correct: true},
            {text: Answer 4, correct: false},

        ]  
    },
    {
        question: "Question #4",
        answers: [
            {text: Answer 1, correct: false},
            {text: Answer 2, correct: false},
            {text: Answer 3, correct: false},
            {text: Answer 4, correct: true},

        ]  
    }
]