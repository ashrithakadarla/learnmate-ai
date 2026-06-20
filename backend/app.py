from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/generate-quiz")
def generate_quiz():
    return jsonify({
        "questions": [
            {
                "question": "What is Java?",
                "options": ["Language", "OS", "DB", "Browser"],
                "answer": "Language",
                "explanation": "Java is a Programming Language"
            },
            {
                "question": "What is JVM?",
                "options": ["Compiler", "Virtual Machine", "Editor", "OS"],
                "answer": "Virtual Machine",
                "explanation": "JVM executes Java bytecode."
            }
        ]
    })

if __name__ == "__main__":
    app.run(debug=True)