
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let currentQuestionIndex = 0;
const questions = document.querySelectorAll(".quiz");
const submitButtons = document.querySelectorAll(".submit-btn");

// Function to show the current question
function showQuestion(index) {
    questions.forEach((question, idx) => {
        question.classList.toggle("active", idx === index);
    });
}

// Function to handle the submission
submitButtons.forEach((button, idx) => {
    button.addEventListener("click", function () {
        const selectedOption = questions[idx].querySelector('input[type="radio"]:checked');

        if (selectedOption) {
            // Disable all options for the current question
            const inputAns = questions[idx].querySelectorAll("input[type='radio']");
            inputAns.forEach((input) => {
                input.disabled = true;
            });

            // Check if the selected answer is correct
            let ansBg = selectedOption.parentElement;
            if (selectedOption.value === "true") {
                ansBg.style.backgroundColor = "green";
                score++;
                correctAnswers++;
            } else {
                ansBg.style.backgroundColor = "red";
                wrongAnswers++;
            }

           
           // Move to the next question after a short delay
           setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    showQuestion(currentQuestionIndex);
                } else {
                    showSummary(); // Show the summary after the last question
                }
            }, 1000); 
        } else {
            alert("Please select an answer before submitting.");
        }
    });
});

// Function to display the summary
function showSummary() {
    const summaryDiv = document.getElementById("quiz-summary");
    document.getElementById("score").textContent = "Total Score: " + score;
    document.getElementById("questions-attempted").textContent = "Questions Attempted: " + (correctAnswers + wrongAnswers);
    document.getElementById("correct-questions").textContent = "Correct Questions: " + correctAnswers;
    document.getElementById("wrong-questions").textContent = "Wrong Questions: " + wrongAnswers;

    // Hide all questions and show the summary
    questions.forEach((question) => {
        question.style.display = "none";
    });
    summaryDiv.style.display = "block";
}
// Show the first question initially
showQuestion(currentQuestionIndex);

    