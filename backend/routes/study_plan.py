from flask import Blueprint, jsonify, request
from services.ai_service import generate_study_plan

study_plan_bp = Blueprint("study_plan", __name__)

@study_plan_bp.route("/generate-study-plan")
def study_plan():
    subject = request.args.get("subject", "General")
    data = generate_study_plan(subject)
    return jsonify(data)