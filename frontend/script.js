const API_URL = "http://3.106.226.211:8080"; // Elastic IP

let questions = [];
let currentQuestion = 0;
let answerCounts = [0, 0, 0, 0]; // Track the count for each house

// Fetch questions from the backend
async function fetchQuestions() {
  try {
    const response = await fetch(`${API_URL}/questions`);
    questions = await response.json();
    loadQuestion();
  } catch (error) {
    console.error("Failed to fetch questions:", error);
  }
}

// Load the current question and options
function loadQuestion() {
  const questionContainer = document.getElementById("question");
  const optionsContainer = document.getElementById("options");

  if (currentQuestion < questions.length) {
    questionContainer.textContent = questions[currentQuestion].question;
    optionsContainer.innerHTML = "";

    questions[currentQuestion].options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => selectOption(index);
      optionsContainer.appendChild(button);
    });
  } else {
    submitAnswers();
  }
}

// Handle user selection and move to the next question
function selectOption(index) {
  answerCounts[index]++; // Increment the count for the selected option
  console.log("Current Answer Counts:", answerCounts);
  currentQuestion++;
  loadQuestion();
}

// Find the index of the most selected option
function findMaxIndex(arr) {
  return arr.indexOf(Math.max(...arr));
}

// Submit answers and display the result
async function submitAnswers() {
  const maxIndex = findMaxIndex(answerCounts);
  console.log("Submitting selectedIndex:", maxIndex);

  try {
    const response = await fetch(`${API_URL}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedIndex: maxIndex }),
    });

    const result = await response.json();
    console.log(result.result);
    // Hide quiz, show results
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "flex";

    document.getElementById("house-name").textContent = result.name;
    document.getElementById("house-name").textContent = result.name;
    document.getElementById("house-description").textContent =
      result.description;

    // Change background color based on house
    changeHouseTheme(result.name);
  } catch (error) {
    console.error("Failed to submit answers:", error);
  }
}

function changeHouseTheme(house) {
  const body = document.body;

  switch (house) {
    case "Gryffindor":
      body.style.backgroundColor = "#7F0909"; // Dark Red
      break;
    case "Hufflepuff":
      body.style.backgroundColor = "#FFDB00"; // Yellow
      break;
    case "Ravenclaw":
      body.style.backgroundColor = "#0E1A40"; // Dark Blue
      break;
    case "Slytherin":
      body.style.backgroundColor = "#1A472A"; // Dark Green
      break;
    default:
      body.style.backgroundColor = "#58378B"; // Default
  }
}
// Restart quiz
function restartQuiz() {
  document.getElementById("result").style.display = "none";
  document.getElementById("home").style.display = "flex";
  document.body.style.backgroundColor = "#58378b";

  // Reset state
  currentQuestion = 0;
  answerCounts = [0, 0, 0, 0];

  console.log("Quiz restarted!");
}

// Page initialization
document.addEventListener("DOMContentLoaded", () => {
  fetchQuestions();

  // Start quiz event
  document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("quiz").style.display = "flex";
  });

  // Restart quiz event
  document
    .getElementById("restart-button")
    .addEventListener("click", restartQuiz);
});
