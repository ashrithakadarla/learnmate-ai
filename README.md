# 📚 LearnMate AI

LearnMate AI is an AI-powered study companion that helps students create personalized study plans, generate topic summaries, take quizzes, and track learning progress from uploaded study materials.

---

## 🚀 Features

### 📄 PDF Upload
- Upload study notes in PDF format.
- Automatically extracts text content.
- Uses uploaded material for planning and summaries.

### 🗓️ Personalized Study Plan
- Generate a study schedule based on:
  - Subject
  - Exam Date
  - Available Study Hours
- Creates daily learning goals.

### 📖 Topic Summaries
- Generate concise summaries for study topics.
- View:
  - Summary
  - Key Points
  - Important Concepts

### 🧠 AI Quiz Generation
- Generate quizzes from selected topics.
- Multiple-choice questions.
- Instant feedback and explanations.
- Identify weak areas for revision.

### 📊 Progress Tracking
- Mark study days as completed.
- Visual progress bar.
- Progress persists using Local Storage.

### ⚠️ Error Handling
- Handles API failures gracefully.
- Displays user-friendly error messages.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- CSS

### Backend
- Flask
- Python

### AI
- Google Gemini API

### PDF Processing
- PyPDF2

### Storage
- Browser Local Storage

---

## 📂 Project Structure

```bash
LearnMate-AI/
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/ashrithakadarla/learnmate-ai.git
cd learnmate-ai
```

---

### 2. Backend Setup

```bash
cd backend

pip install -r requirements.txt

python app.py
```

Backend runs on:

```bash
http://127.0.0.1:5000
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder:

```env
GEMINI_API_KEY=your_gemini_api_key
```

---

## 🎯 Workflow

1. Upload Study Notes PDF
2. Generate Study Plan
3. Select a Topic
4. Generate Summary
5. Generate Quiz
6. Complete Daily Tasks
7. Track Progress

---

## 📸 Screenshots

### Home Page
(Add Screenshot)

### Study Plan
(Add Screenshot)

### Summary Page
(Add Screenshot)

### Quiz Page
(Add Screenshot)

### Progress Tracking
(Add Screenshot)

---

## 🔮 Future Enhancements

- User Authentication
- Database Integration
- Cloud Deployment
- Adaptive Learning Recommendations
- Performance Analytics Dashboard
- Study Streak Tracking

---

## 👨‍💻 Author

**Ashritha Kadarla**

Built for Hackathons and Student Productivity 🚀

---

## 📜 License

This project is developed for educational and hackathon purposes.