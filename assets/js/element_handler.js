
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

function displayPreviousScores() {
    // Check that scores are saved locally
    if (localStorage.length > 0) {
        // Generate previous scores table container
        let pst_container = document.createElement("section");
        pst_container.setAttribute("id", "previous_scores_container");

        // Create the previous scores heading
        let heading = document.createElement("h1");
        heading.setAttribute("class", "previous_scores_heading");
        heading.innerHTML = "Previous Scores";

        // Create the previous scores table
        let ps_table = document.createElement("table");

        // Generate the table headings
        let t_heading = document.createElement("tr");
        let init_cell = document.createElement("th");
        init_cell.innerText = "Initials";
        let numcorrect_cell = document.createElement("th");
        numcorrect_cell.innerText = "Correct Responses";
        let pscore_cell = document.createElement("th");
        pscore_cell.innerText = "Percent Score";

        // Append heading cells table row, then row to table
        t_heading.appendChild(init_cell);
        t_heading.appendChild(numcorrect_cell);
        t_heading.appendChild(pscore_cell);
        ps_table.appendChild(t_heading);

        // Generate the cells for each property
        for (var i = 0 ; i < localStorage.length ; i++) {
            // Get the key associated with a previous high score's initials
            let ps_key = localStorage.key(i);
            let ps_data = JSON.parse(localStorage[ps_key]);
            
            let user_row = document.createElement("tr");

            let ui_cell = document.createElement("td");
            ui_cell.innerText = ps_data["user_initials"];

            let nc_cell = document.createElement("td");
            nc_cell.innerText = ps_data["num_correct"];

            let ps_cell = document.createElement("td");
            ps_cell.innerText = ps_data["percent_score"];

            // Append heading cells table row, then row to table
            user_row.appendChild(ui_cell);
            user_row.appendChild(nc_cell);
            user_row.appendChild(ps_cell);
            ps_table.appendChild(user_row);
        }

        // Append table to page
        display_element.appendChild(ps_table);
    }
}

function removeElement(element_id) {
    let element_to_remove = document.querySelector(`#${element_id}`);
    
    // Check that the element actually exists, and remove if so
    if (element_to_remove !== null) {
        element_to_remove.remove();
    }
}