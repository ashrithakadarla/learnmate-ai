from flask import Blueprint, request, jsonify
from services.ai_service import generate_topic_quiz

topic_quiz_bp = Blueprint("topic_quiz", __name__)

@topic_quiz_bp.route("/generate-topic-quiz")
def topic_quiz():

    topic = request.args.get("topic")
    content = request.args.get("content")

    data = generate_topic_quiz(topic, content)

    return jsonify(data)