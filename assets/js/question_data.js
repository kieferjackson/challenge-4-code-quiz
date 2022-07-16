
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

        // Create and append the feedback element to the container
        let q_feedback = document.createElement("div");
        q_feedback.setAttribute("class", "question_feedback");
        q_container.appendChild(q_feedback);

        // Append the question responses to the container, and the container to the document
        q_container.appendChild(r_box);
        display_element.appendChild(q_container);

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