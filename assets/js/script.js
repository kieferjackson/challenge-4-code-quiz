
// This is the existing parent element which the quiz related elements will be appended to
const display_element = document.querySelector("#game_display");
var question_responses = document.querySelector(".response_bubble");

generateQuizStart();

var timer = {
    speed: 1000,    // Interval of time (ms)
    def_dur: 75,    // Default timer duration
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

var quiz_state = {
    num_correct: 0,
    get percent_score() { return `${(this.num_correct / questions.length) * 100}%`; },
    user_initials: null
};

// Index variable to access each question, incremented each time a response is chosen
var q;

// Listen for user's response to a quiz question
document.addEventListener('click', function(event) {
    // Check that the clicked element is a response
    if (event.target.className === "response_bubble") {
        let user_response = event.target.innerHTML;

        // Evaluate if the user's chosen response is the correct answer
        let r_correct = questions[q].checkAnswer(user_response);

        // Update quiz state
        if (r_correct) {
            quiz_state.num_correct++;
            console.log(`Question ${q + 1} was correct!`);
        } else {
            timer.duration -= 15;
            console.log(`Question ${q + 1} was incorrect...`);
        }

        // Clear question and prompts so that next question can be displayed
        removeElement("question_container");

        // Go to next possible question and display to page, end quiz if no more questions
        q++;
        if (q < questions.length) {
            questions[q].displayQuestion();
        } else {
            // Display final score
            endQuiz();
        }
        
    }
});

function quizHandler() {
    // Clear the welcome message and all its contents, and reset game state/timer
    removeElement("quiz_start");
    quiz_state.num_correct = 0;
    timer.duration = timer.def_dur;
    
    // Select the timer display element and set its value to the starting time duration
    let timer_el = document.querySelector("#time_display");
    timer_el.innerHTML = timer.sec_to_min();

    let time_remaining = setInterval( () => {
        // Decrement the time remaining by 1 sec and update the timer display
        timer.duration--;
        timer_el.innerHTML = timer.sec_to_min();

        if (timer.duration <= 0) {
            // No time remaining: stop the timer and end quiz
            clearInterval(time_remaining);

            // Clear the quiz display
            removeElement("question_container");

            // Display final score
            endQuiz();
        } else if (q >= questions.length) {
            // No questions remaining: stop the timer
            clearInterval(time_remaining);
        }

    }, timer.speed
    );

    // First index for questions array
    q = 0;

    // Display the first question to the page if it exists
    if (questions.length > q) {
        questions[q].displayQuestion();
    } else {
        console.log("No questions here.");
    }
}

function generateQuizStart() {
    // Quiz Start Container to contain heading, message, and quiz start button
    let q_start = document.createElement("section");
    q_start.setAttribute("id", "quiz_start");

    // Create the welcome heading
    let heading = document.createElement("h1");
    heading.setAttribute("class", "question_prompt");
    heading.innerHTML = "Coding Quiz - Test your knowledge!";

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
    q_start.appendChild(heading);
    q_start.appendChild(message);
    q_start.appendChild(start_button);

    // Append quiz start to document
    display_element.appendChild(q_start);
}

function endQuiz() {
    // Clear question elements
    // removeElement("question_container");

    // Generate high score save screen container
    let hs_container = document.createElement("section");
    hs_container.setAttribute("id", "high_score_container");

    // Create the high score heading
    let heading = document.createElement("h1");
    heading.setAttribute("class", "high_score_heading");
    heading.innerHTML = "Finished!";

    // Create the welcome message
    let score = document.createElement("p");
    score.setAttribute("class", "message");
    score.innerHTML = `Your final score is ${quiz_state.num_correct} out of ${questions.length} (${quiz_state.percent_score})`;

    // Create the user initials input field
    let init_field = document.createElement("input");
    init_field.setAttribute("id", "initials");
    init_field.setAttribute("minlength", "2");
    init_field.setAttribute("maxlength", "2");

    // Create the label for the initials input field
    let init_label = document.createElement("label");
    init_label.setAttribute("for", "initials");
    init_label.innerText = "First and Last Initials";

    // Button element to save high score
    let shs_button = document.createElement("button");
    shs_button.setAttribute("type", "button");
    shs_button.setAttribute("id", "save_high_score");
    shs_button.setAttribute("onclick", "saveScore()");
    shs_button.innerText = "Save";

    // Append children to high score save screen container
    hs_container.appendChild(heading);
    hs_container.appendChild(score);
    hs_container.appendChild(init_label);
    hs_container.appendChild(init_field);
    hs_container.appendChild(shs_button);

    // Append high score screen to document
    display_element.appendChild(hs_container);
}

function saveScore() {
    // Save the user's initials
    let u_initials = document.querySelector("#initials").value;
    quiz_state.user_initials = u_initials;

    // Convert quiz state to stringified JSON object
    json_qs = JSON.stringify(quiz_state);

    // Save user score to local storage
    localStorage.setItem(`${u_initials}_score`, json_qs);
}

function removeElement(element_id) {
    let element_to_remove = document.querySelector(`#${element_id}`);

    element_to_remove.remove();
}
