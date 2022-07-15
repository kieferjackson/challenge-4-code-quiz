
// This is the existing parent element which the quiz related elements will be appended to
const display_element = document.querySelector("#game_display");
var question_responses = document.querySelector(".response_bubble");

class Question {
    constructor(prompt, responses, answer) {
        this.prompt = prompt;
        this.responses = responses;
        this.answer = answer;
    }

    checkAnswer(response) {
        return response === this.answer;
    }

    displayQuestion() {
        // Question Container to contain prompt, questions, and feedback message
        let q_container = document.createElement("section");
        q_container.setAttribute("id", "question_container");

        // Create and append the question prompt to the container
        let q_prompt = document.createElement("h1");
        q_prompt.setAttribute("class", "question_prompt");
        q_prompt.innerHTML = this.prompt;
        q_container.appendChild(q_prompt);

        // Element to hold the question responses as list items
        let r_box = document.createElement("ul");
        r_box.setAttribute("id", "responses_box");

        // Generate each response option
        this.responses.forEach(element => {
            let response = document.createElement("li");
            response.setAttribute("class", "response_bubble");
            response.innerHTML = element;

            // Append the question to the unorderlist element
            r_box.appendChild(response);
        });

        // Append the question responses to the container, and the container to the document
        q_container.appendChild(r_box);
        display_element.appendChild(q_container);

    }
}

generateQuizStart();

var timer = {
    speed: 1000,    // Interval of time (ms)
    duration: 75,   // Total time remaining (s)
    sec_to_min() {
        // Converting minutes and remaining seconds
        if (this.duration >= 60) {
            let minutes = parseInt(this.duration / 60);
            let seconds = this.duration % 60;

            if (seconds < 10) {
                seconds = `0${seconds}`;
            }

            return `${minutes}:${seconds}`;
        } 
        // The remaining time is only in seconds
        else if (this.duration < 60 && this.duration > 0) {
            return `${this.duration}`;
        }
        // No time remaining
        else {
            return "Time's up!";
        }
    }
}

const questions = [
    new Question(
        "Which datatype has two possible values of <code>true</code> or <code>false</code>?",
        [
            "Integer", 
            "Boolean", 
            "String", 
            "Float"
        ],
        "Boolean"
        ),
    new Question(
        "<code>0.1 + 0.2 === 0.3</code> evaluates to <code>false</code> in JavaScript. Why?",
        [
            "Inherent rounding error in computers", 
            "The sum of 0.1 and 0.2 is not 0.3", 
            "The <code>==</code> operator should be used instead", 
            "JavaScript is a bad programming language"
        ],
        "Inherent rounding error in computers"
        ),
    new Question(
        "Which of the following options is used to enclose the contents of an array?",
        [
            "Curly Brackets: {}", 
            "Parentheses: ()", 
            "Square Brackets: []", 
            "Forward Slashes: //"
        ],
        "Square Brackets: []"
        ),
    new Question(
        "Which of the following values cannot be changed after being declared?",
        [
            "<code>const PI = 3.14;</code>", 
            "<code>var PI = 3.14;</code>", 
            "<code>let constant = 64;</code>", 
            "<code>eight_squared = 64;</code>"
        ],
        "<code>const PI = 3.14;</code>"
        ),
    new Question(
        "Keyword for declaring a code loop in JavaScript?",
        [
            "loop", 
            "repeat", 
            "iterate", 
            "for"
        ],
        "for"
        )
];

var quiz_state = {
    num_correct: 0,
    get percent_score() { return `${(this.num_correct / questions.length) * 100}%`; },
    user_initials: null
};

document.addEventListener('click', function(event) {
    // Check that the clicked element is a response
    if (event.target.className === "response_bubble") {
        console.log("click!");
    }
});

function quizHandler() {
    // Clear the welcome message and all its contents
    removeElement("quiz_start");
    
    // Select the timer display element and set its value to the starting time duration
    let timer_el = document.querySelector("#time_display");
    timer_el.innerHTML = timer.sec_to_min();

    setInterval( () => {
        // Decrement the time remaining by 1 sec and update the timer display
        timer.duration--;
        timer_el.innerHTML = timer.sec_to_min();

    }, timer.speed
    );

    // Display the questions to the page
    for (var i = 0 ; i < questions.length ; i++) {
        questions[i].displayQuestion();
    }
}

function generateQuizStart() {
    // Quiz Start Container to contain heading, message, and quiz start button
    let q_start = document.createElement("section");
    q_start.setAttribute("id", "quiz_start");

    // Create the welcome header to the container
    let header = document.createElement("h1");
    header.setAttribute("class", "question_prompt");
    header.innerHTML = "Coding Quiz - Test your knowledge!";

    // Create the welcome message
    let message = document.createElement("p");
    message.setAttribute("class", "message");
    message.innerHTML = "The following quiz was designed to score you based on the number of correct responses. There is a time limit for the quiz, so try to give the correct answer and do it as quickly as you can!";

    // Button element to start the quiz
    let start_button = document.createElement("button");
    start_button.setAttribute("type", "button");
    start_button.setAttribute("id", "start_button");
    start_button.setAttribute("onclick", "quizHandler()");
    start_button.innerText = "Start Quiz";

    // Append children to quiz start container
    q_start.appendChild(header);
    q_start.appendChild(message);
    q_start.appendChild(start_button);

    // Append quiz start to document
    display_element.appendChild(q_start);
}

function removeElement(element_id) {
    let element_to_remove = document.querySelector(`#${element_id}`);

    element_to_remove.remove();
}
