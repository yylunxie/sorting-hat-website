from flask import Flask, request, jsonify

app = Flask(__name__)

# Example questions and logic for determining the result
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


@app.route("/questions", methods=["GET"])
def get_questions():
    """Endpoint to retrieve all questions"""
    return jsonify(questions)


@app.route("/submit", methods=["POST"])
def submit_answers():
    """Endpoint to receive answers and calculate result"""
    data = request.json
    answers = data.get("answers", [])

    # Simple logic to calculate the house based on answers
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
