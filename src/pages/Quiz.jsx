import { useState } from "react";
import "./Quiz.css";

function Quiz() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [weakAreas, setWeakAreas] = useState([]);

  const sampleQuestions = [
    {
      question: "What is Java?",
      options: ["Language", "OS", "DB", "Browser"],
      answer: "Language",
      explanation: "Java is a Programming Language"
    },
    {
      question: "What is JVM?",
      options: ["Compiler", "Virtual Machine", "Editor", "OS"],
      answer: "Virtual Machine",
      explanation: "JVM executes Java bytecode and makes Java platform independent."
    },
  ];
  const handleGenerateQuiz = () => {
    setQuestions(sampleQuestions);
    setCurrentQuestion(0);
    setScore(null);
    setWeakAreas([]);
    setSelectedAnswers({});
  };
  const handleSubmit = () => {
    let marks = 0;
    let wrong = [];
  
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) {
        marks++;
      } else {
        wrong.push({
          question:q.question,
          yourAnswer:selectedAnswers[i],
          correct: q.answer,
          explanation:q.explanation
        });
      }
    });
  
    setScore(marks);
    setWeakAreas(wrong);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">🧠 Quiz Generator</h1>
  
      <input
        className="quiz-input"
        type="text"
        placeholder="Enter Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
  
      <button className="quiz-button" onClick={handleGenerateQuiz}>
        Generate Quiz
      </button>
  
      <div className="quiz-list">
        {questions.length > 0 && (
          <div className="quiz-card">
  
            <h3 className="quiz-question">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
  
            <p>{questions[currentQuestion].question}</p>
  
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="quiz-option">
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option}
                  checked={selectedAnswers[currentQuestion] === option}
                  onChange={(e) => setSelectedAnswers({
                    ...selectedAnswers,
                    [currentQuestion]: option
                  })}
                />
                <label>{option}</label>
              </div>
            ))}
  
            {/* Navigation Buttons */}
            {currentQuestion < questions.length - 1 ? (
              <button
                className="quiz-button"
                onClick={() =>
                  setCurrentQuestion(currentQuestion + 1)
                }
              >
                Next Question →
              </button>
            ) : (
              <button className="quiz-button" onClick={handleSubmit}>
                Submit Quiz
              </button>
            )}
  
          </div>
        )}
        {score !== null && (
          <div>
            <h2>Score: {score}/{questions.length}</h2>

            {weakAreas.length > 0 && (
  <div className="quiz-card">
    <h3>🧠 Learning Feedback</h3>
    {weakAreas.map((item, index) => (
      <div key={index} style={{ marginBottom: "15px" }}>
        <p><b>Question:</b> {item.question}</p>

        <p style={{ color: "red" }}>
          ❌ Your Answer: {item.yourAnswer}
        </p>

        <p style={{ color: "green" }}>
          ✔ Correct Answer: {item.correct}
        </p>

        <p style={{ color: "#555" }}>
          💡 Explanation: {item.explanation}
        </p>
        </div>
        ))}
    </div>
    )}
      </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;