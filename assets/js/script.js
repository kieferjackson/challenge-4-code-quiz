
// This is the existing parent element which the quiz related elements will be appended to
const display_element = document.querySelector("#game_display");
let timer_el = document.querySelector("#time_display");
var question_responses = document.querySelector(".response_bubble");

generateQuizStart();

var quiz_state = {
    num_correct: 0,
    current_question: 0,
    get percent_score() { return `${(this.num_correct / questions.length) * 100}%`; },
    user_initials: null,
    reset() {
        this.num_correct = 0;
        this.current_question = 0;
        this.user_initials = null;
    }
};

var timer = {
    interval: 1000,    // Interval of time (ms)
    def_dur: 75,    // Default timer duration (s)
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
    },
    start() {
        let time_remaining = setInterval( () => {
            // Decrement the time remaining by 1 sec and update the timer display
            this.duration--;
            timer_el.innerHTML = this.sec_to_min();
    
            if (this.duration <= 0) {
                // No time remaining: stop the timer and end quiz
                clearInterval(time_remaining);
    
                // Check if results are displayed already, and clear the quiz display and end quiz if not
                if (document.querySelector("#high_score_container") === null) {
                    removeElement("question_container");
    
                    // Display final score
                    endQuiz();
                }
                
            } else if (quiz_state.current_question >= questions.length) {
                // No questions remaining: stop the timer
                clearInterval(time_remaining);
            }
    
        }, this.interval
        );
    },
    reset() {
        this.duration = this.def_dur;
    }
}

// Listen for user's response to a quiz question
document.addEventListener('click', function(event) {
    // Check that the clicked element is a response
    if (event.target.className === "response_bubble") {
        let user_response = event.target.innerHTML;

        q = quiz_state.current_question;

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
        quiz_state.current_question++;

        if (quiz_state.current_question < questions.length) {
            questions[quiz_state.current_question].displayQuestion();
        } else {
            // Display final score
            endQuiz();
        }
        
    }
});

function quizHandler() {
    // Clear the welcome message and all its contents, and reset quiz state/timer
    removeElement("quiz_start");
    quiz_state.reset();
    timer.reset();
    
    // Start the timer and decrement by 1 each completed interval
    timer.start();

    // Display the first question to the page if it exists
    if (questions.length > 0) {
        questions[quiz_state.current_question].displayQuestion();
    } else {
        console.log("No questions here.");
    }
}
