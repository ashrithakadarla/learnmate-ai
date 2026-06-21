from flask import Blueprint, request, jsonify
from PyPDF2 import PdfReader
from services.ai_service import generate_study_plan

from datetime import date, datetime
import os

upload_bp = Blueprint("upload", __name__)

UPLOAD_FOLDER = "uploads"

@upload_bp.route("/upload-pdf", methods=["POST"])
def upload_pdf():

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    exam_date = request.form.get("examDate")

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(filepath)

    reader = PdfReader(filepath)

    text = ""

    for page in reader.pages:
        extracted = page.extract_text()

        if extracted:
            text += extracted + "\n"

    today = date.today()

    exam = datetime.strptime(
        exam_date,
        "%Y-%m-%d"
    ).date()

    days_left = (exam - today).days

    if days_left <= 0:
        days_left = 1

    plan = generate_study_plan(
        text,
        days_left
    )

    return jsonify({
        "filename": file.filename,
        "content": text[:3000],
        "plan": plan,
        "daysLeft": days_left
    })