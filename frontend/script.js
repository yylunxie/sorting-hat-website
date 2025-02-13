const API_URL = "YOUR_API_URL"; // Elastic IP

let questions = [];
let currentQuestion = 0;
let answers = [];

// 初始化，取得問題
async function fetchQuestions() {
  try {
    const response = await fetch(`${API_URL}/questions`);
    questions = await response.json();
    loadQuestion();
  } catch (error) {
    console.error("Failed to fetch questions:", error);
  }
}

// 顯示問題
function loadQuestion() {
  const questionContainer = document.getElementById("question");
  const optionsContainer = document.getElementById("options");

  if (currentQuestion < questions.length) {
    questionContainer.textContent = questions[currentQuestion].question;
    optionsContainer.innerHTML = "";

    questions[currentQuestion].options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => selectOption(option);
      optionsContainer.appendChild(button);
    });
  } else {
    submitAnswers();
  }
}

// 處理用戶選擇
function selectOption(option) {
  answers.push(option);
  currentQuestion++;
  loadQuestion();
}

// 提交答案並顯示結果
async function submitAnswers() {
  try {
    const response = await fetch(`${API_URL}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    const result = await response.json();
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById(
      "result"
    ).textContent = `You belong to: ${result.result}!`;
  } catch (error) {
    console.error("Failed to submit answers:", error);
  }
}

// 頁面載入時取得問題
fetchQuestions();
