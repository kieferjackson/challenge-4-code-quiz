
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
    // Get the user's initials
    let u_initials = document.querySelector("#initials").value;
    let onlyAlphaChars = /[a-zA-Z]+$/.test(u_initials);
    let twoCharsLong = u_initials.length === 2;

    // User's initials are valid, save to local storage
    if (onlyAlphaChars && twoCharsLong) {
        // Update the quiz state object with the user's initials
        quiz_state.user_initials = u_initials;

        // Convert quiz state to stringified JSON object
        json_qs = JSON.stringify(quiz_state);

        // Save user score to local storage
        localStorage.setItem(`${u_initials}_score`, json_qs);
    }
    // Not all characters were alphabetical, reject input
    else if (!onlyAlphaChars) {
        alert("Initials may only contain alphabetical characters.");
    } 
    // Less or more than two characters were entered, reject input
    else if (!twoCharsLong) {
        alert("Initials must be two characters long.");
    } 
    // Not all characters were alphabetical; the number of characters was invalid, reject input
    else {
        alert("Initials must contain only alphetical character and be two characters long.");
    }
    
}

function removeElement(element_id) {
    let element_to_remove = document.querySelector(`#${element_id}`);
    debugger;
    // Check that the element actually exists, and remove if so
    if (element_to_remove !== null) {
        element_to_remove.remove();
    }
}