from flask import Flask
from flask_cors import CORS

from routes.quiz import quiz_bp
from routes.study_plan import study_plan_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(quiz_bp)
app.register_blueprint(study_plan_bp)

@app.route("/")
def home():
    return {
        "message": "AI Study Buddy Backend Running"
    }

if __name__ == "__main__":
    app.run(debug=True)