const API_URL = "YOUR_API_URL"; // Elastic IP

let questions = [];
let currentQuestion = 0;
let answerCounts = [0, 0, 0, 0]; // 初始化計數陣列

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

    questions[currentQuestion].options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option; // ✅ 只顯示選項，不顯示數字
      button.onclick = () => selectOption(index);
      optionsContainer.appendChild(button);
    });
  } else {
    submitAnswers();
  }
}

// 處理用戶選擇
function selectOption(index) {
  answerCounts[index]++; // 增加對應索引的計數
  console.log("Current Answer Counts:", answerCounts); // 在 Console 顯示目前計數
  currentQuestion++;
  loadQuestion();
}

// 找出最大值的索引
function findMaxIndex(arr) {
  if (arr.length === 0) return 0; // 確保不會傳 `undefined`
  return arr.indexOf(Math.max(...arr));
}

// 提交答案並顯示結果
async function submitAnswers() {
  const maxIndex = findMaxIndex(answerCounts); // 找出計數最多的選項
  console.log("Submitting selectedIndex:", maxIndex); // 確保 `selectedIndex` 正確

  try {
    const response = await fetch(`${API_URL}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedIndex: maxIndex }), // 只傳遞最大索引
    });

    const result = await response.json();
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("result").textContent = `You belong to: ${result.result}!`;
  } catch (error) {
    console.error("Failed to submit answers:", error);
  }
}

// 頁面載入時取得問題
fetchQuestions();
