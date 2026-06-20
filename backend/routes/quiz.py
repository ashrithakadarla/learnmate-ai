from flask import Blueprint, jsonify, request
from services.ai_service import generate_quiz

quiz_bp = Blueprint("quiz", __name__)

@quiz_bp.route("/generate-quiz")
def quiz():
    subject = request.args.get("subject", "General")
    data = generate_quiz(subject)
    return jsonify(data)