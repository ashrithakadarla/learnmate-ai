from flask import Blueprint, request, jsonify
from services.ai_service import generate_summary

summary_bp = Blueprint("summary", __name__)

@summary_bp.route("/generate-summary")
def summary():

    topic = request.args.get("topic")
    content = request.args.get("content")

    data = generate_summary(topic, content)

    return jsonify(data)