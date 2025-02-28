import json
from flask import Flask, request, jsonify
from flask_cors import CORS  # 解決跨域問題

FRONTEND_URL = "http://sorting-hat-demo.s3-website-ap-southeast-2.amazonaws.com"
app = Flask(__name__)
CORS(
    app,
    resources={r"/*": {"origins": FRONTEND_URL}},
)  # 啟用跨域請求支援


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = FRONTEND_URL
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response


# 測驗題目
questions = [
    {
        "id": 1,
        "question": "如果你可以選擇一種魔法物品，你會選哪一個？",
        "options": ["A. 隱形斗篷", "B. 變形咒筆記", "C. 學者之鏡", "D. 忠誠護符"],
    },
    {
        "id": 2,
        "question": "2. 你正在參與魁地奇比賽，你最希望擔任哪個角色？",
        "options": [
            "A. 追球手，負責接球並將鬼飛球投進對方球門，是隊伍的主要得分手，講求速度與靈活度",
            "B.看守手，負責守護球門，阻擋對方的進球，需要敏銳的觀察力與精準的預測能力",
            "C. 搜尋手，負責尋找並捕捉金探子，成功捉到後可為隊伍獲得額外 150 分，通常決定比賽勝負",
            "D. 擊球手，負責揮舞球棒擊打游走球，干擾對手並保護隊友，講求力量與戰略思維",
        ],
    },
    {
        "id": 3,
        "question": "3. 你被邀請參與一場黑魔法防禦術的測試，面對「博格」變出的最恐怖的幻象，你會怎麼應對？",
        "options": [
            "A. 直接衝上去使用「咄咄失」",
            "B. 讓它變成可控狀態後反擊",
            "C. 用「咯咯笑」咒語讓它變滑稽",
            "D. 觀察弱點並與夥伴合作 ",
        ],
    },
    {
        "id": 4,
        "question": "4. 你進入一個被施了魔法的庭院，好奇心會驅使你先查看什麼?",
        "options": [
            "A. 冒著泡的水池，裡面有某種閃爍的東西飛舞著 ",
            "B. 銀色葉子的樹，上面長著金色蘋果",
            "C. 一座老巫師的雕像，眼睛詭異地眨著",
            "D. 一叢長滿鮮豔花朵的植物，輕輕搖曳，彷彿在低聲哼唱",
        ],
    },
    {
        "id": 5,
        "question": "5. 一個麻瓜向你對峙，說他確定你是巫師，你會怎麼做？",
        "options": [
            "A. 承認，然後走開，讓他自己琢磨你是不是在吹牛",
            "B. 承認，並問他要不要免費體驗一下惡咒",
            "C. 問他為什麼有這種想法",
            "D. 告訴他你懷疑他精神方面有問題，並提出幫忙打電話給醫生",
        ],
    },
]

# Load house descriptions from JSON file
with open("house_descriptions.json", "r", encoding="utf-8") as file:
    house_descriptions = json.load(file)


@app.route("/")
def index():
    return "Hello, World!"


# 提供題目 API
@app.route("/questions", methods=["GET"])
def get_questions():
    return jsonify(questions)


# 接收答案並計算結果 API
@app.route("/submit", methods=["POST"])
def submit_answers():
    data = request.json
    selected_index = data.get("selectedIndex")  # 讀取前端傳來的最大值索引

    print(f"🔹 Received selectedIndex: {selected_index}")  # 🔹 打印到 EC2 終端

    # House 對應規則
    house_map = {
        0: "Gryffindor",
        1: "Slytherin",
        2: "Ravenclaw",
        3: "Hufflepuff",
    }

    house = house_map.get(selected_index, "Unknown")  # 預設 Unknown 避免錯誤
    description = house_descriptions.get(str(selected_index), "Unknown")
    print(f"Assigned house: {house}")  # 🏠 在 EC2 終端顯示結果

    return jsonify(
        {
            "name": house,
            "description": description,
        }
    )
