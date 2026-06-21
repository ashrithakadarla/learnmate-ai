from flask import Blueprint, jsonify, request
from services.ai_service import generate_study_plan

study_plan_bp = Blueprint("study_plan", __name__)

@study_plan_bp.route("/generate-study-plan")
def study_plan():
    subject = request.args.get("subject", "General")
    days_left = request.args.get("daysLeft", 7)
    data = generate_study_plan(subject,days_left)
    return jsonify(data)