def generate_quiz(subject):
    return {
        "questions": [
            {
                "question": f"What is {subject}?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "answer": "Option A",
                "explanation": f"Sample explanation for {subject}"
            }
        ]
    }


def generate_study_plan(subject):
    return {
        "plan": [
            {
                "day": 1,
                "topic": f"Introduction to {subject}"
            }
        ]
    }