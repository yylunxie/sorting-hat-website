from flask import Flask, request, jsonify
from flask_cors import CORS  # 解決跨域問題

app = Flask(__name__)
CORS(app)  # 啟用跨域請求支援

# 測驗題目
questions = [
    {
        "id": 1,
        "question": "What is your favorite color?",
        "options": ["Red", "Blue", "Green", "Yellow"],
    },
    {
        "id": 2,
        "question": "What is your favorite animal?",
        "options": ["Lion", "Snake", "Eagle", "Badger"],
    },
    {
        "id": 3,
        "question": "What do you value most?",
        "options": ["Bravery", "Ambition", "Wisdom", "Loyalty"],
    },
]


# 提供題目 API
@app.route("/questions", methods=["GET"])
def get_questions():
    return jsonify(questions)


# 接收答案並計算結果 API
@app.route("/submit", methods=["POST"])
def submit_answers():
    data = request.json
    answers = data.get("answers", [])
    # 根據答案計算結果
    if "Bravery" in answers:
        house = "Gryffindor"
    elif "Ambition" in answers:
        house = "Slytherin"
    elif "Wisdom" in answers:
        house = "Ravenclaw"
    else:
        house = "Hufflepuff"
    return jsonify({"result": house})


if __name__ == "__main__":
    app.run(debug=True)
