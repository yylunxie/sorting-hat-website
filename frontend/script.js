const API_URL = "http://3.107.195.35:8080"; // 你的 API 伺服器 URL

let questions = [];
let currentQuestion = 0;
let answerCounts = [0, 0, 0, 0]; // 記錄每個選項的次數
let quizCompleted = false; // 防止重複提交答案

// 載入題目資料
// Fetch questions from the backend
async function fetchQuestions() {
  try {
    const response = await fetch(`${API_URL}/questions`);
    questions = await response.json();

    if (questions.length > 0) {
      currentQuestion = 0; // 確保第一題從 0 開始
      loadQuestion(); // 立即載入第一題
    } else {
      console.error("No questions received from the API.");
    }
  } catch (error) {
    console.error("Failed to fetch questions:", error);
  }
}

function loadQuestion() {
  const questionContainer = document.getElementById("question");
  const optionsContainer = document.getElementById("options");

  if (currentQuestion < questions.length) {
    let questionText = questions[currentQuestion].question;

    // **只有第一題手動加題號，後續題目不動**
    if (currentQuestion === 0 && !/^\d+\.\s+/.test(questionText)) {
      questionText = `1. ${questionText}`;
    }

    questionContainer.textContent = questionText; // 正確顯示題目
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



// 處理使用者選擇答案
function selectOption(index) {
  if (quizCompleted) return; // **如果已提交，不要再處理點擊**
  
  answerCounts[index]++; // 紀錄選擇次數
  console.log("Current Answer Counts:", answerCounts);
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    submitAnswers();
  }
}

// 找出最常被選擇的選項
function findMaxIndex(arr) {
  return arr.indexOf(Math.max(...arr));
}

// 提交答案
async function submitAnswers() {
  if (quizCompleted) return; // **確保 submitAnswers 只執行一次**
  quizCompleted = true; // **標記測驗已完成，防止重複提交**

  const maxIndex = findMaxIndex(answerCounts);
  console.log("Submitting selectedIndex:", maxIndex);

  try {
    const response = await fetch(`${API_URL}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedIndex: maxIndex }),
    });

    const result = await response.json();
    console.log("Quiz result:", result);

    // 隱藏測驗頁面，顯示結果頁面
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "flex";

    document.getElementById("house-title").textContent = result.name;
    document.getElementById("house-description").innerHTML = result.description;

    // 更改背景顏色
    changeHouseTheme(result.name);
  } catch (error) {
    console.error("Failed to submit answers:", error);
  }
}

// 更改背景主題
function changeHouseTheme(house) {
  const body = document.body;
  const resultImage = document.getElementById("house-image");

  // 先移除舊的 body class
  document.body.classList.remove(
    "body-default",
    "body-gryffindor",
    "body-hufflepuff",
    "body-ravenclaw",
    "body-slytherin"
  );

  // 設定圖片
  const houseImages = {
    gryffindor: "img/Gryffindor.png",
    slytherin: "img/Slytherin.png",
    ravenclaw: "img/Ravenclaw.png",
    hufflepuff: "img/Hufflepuff.png",
  };

  // 設定背景顏色
  body.classList.add(`body-${house.toLowerCase()}`);
  resultImage.src = houseImages[house.toLowerCase()];
}

// 重新開始測驗，回到 Home 畫面
function restartQuiz() {
  document.getElementById("result").style.display = "none"; // 隱藏結果頁面
  document.getElementById("home").style.display = "flex"; // 顯示 Home 頁面
  document.getElementById("quiz").style.display = "none"; // 確保測驗畫面隱藏

  // 切換回預設背景
  document.body.classList.remove(
    "body-gryffindor",
    "body-hufflepuff",
    "body-ravenclaw",
    "body-slytherin"
  );
  document.body.classList.add("body-default");

  // 重設狀態
  currentQuestion = 0;
  answerCounts = [0, 0, 0, 0];
  quizCompleted = false; // **確保下一輪測驗可以重新運作**

  console.log("Quiz restarted! Back to Home.");
}

// 畫面載入後執行
document.addEventListener("DOMContentLoaded", () => {
  fetchQuestions(); // 預先載入題目

  // 開始測驗
  document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("home").style.display = "none"; // 隱藏 Home 畫面
    document.getElementById("quiz").style.display = "flex"; // 顯示測驗畫面
    loadQuestion(); // 載入第一題
  });

  // 重新開始測驗
  document.getElementById("restart-button").addEventListener("click", restartQuiz);
});
