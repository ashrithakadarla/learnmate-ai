import { useState } from 'react'
import { fetchStudyPlan } from '../services/studyPlanService'
import { Link } from "react-router-dom";
import './StudyPlan.css'

function StudyPlan() {
  const [subject, setSubject] = useState('')
  const [examDate, setExamDate] = useState('')
  const [hoursPerDay, setHoursPerDay] = useState('')
  const [plan, setPlan] = useState(null)
  const [error, setError] = useState('')
  const [pdfFile, setPdfFile] = useState(null)
  const [pdfContent, setPdfContent] = useState("")
  const [loading, setLoading] = useState(false)
  const daysLeft = examDate
      ? Math.ceil(
          (new Date(examDate) - new Date()) /
          (1000 * 60 * 60 * 24)
        )
      : 0
  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    
    try{
      if (pdfFile) {
        const pdfResult = await uploadPdf()
      
        setPdfContent(pdfResult.content)
      
        setPlan({
          ...pdfResult.plan,
          subject,
          examDate,
          hoursPerDay,
          daysLeft: pdfResult.daysLeft
        })
        return
      }  
  
      const result = await fetchStudyPlan({
        subject,
        examDate,
        hoursPerDay: Number(hoursPerDay),
        daysLeft
      })
  
      if (!result.success) {
        setPlan(null)
        setError(result.error)
        return
      }
  
      setPlan(result.plan)
    }
    finally{
      setLoading(false)
    }
  }

  async function uploadPdf() {

    if (!pdfFile) return null

    const formData = new FormData()

    formData.append("file", pdfFile)
    formData.append("examDate", examDate)

    const response = await fetch(
      "http://127.0.0.1:5000/upload-pdf",
      {
        method: "POST",
        body: formData
      }
    )
    return await response.json()
  }

  return (
    <div className="study-plan">
      <div className="study-plan__container">
        <header className="study-plan__header">
          <p className="study-plan__eyebrow">Plan your success</p>
          <h1 className="study-plan__title">Build Your Study Plan</h1>
          <p className="study-plan__subtitle">
            Enter your subject and exam details to generate a personalized daily
            schedule that keeps you on track.
          </p>
        </header>

        <div className="study-plan__layout">
          <section className="study-plan__card study-plan__form-card">
            <h2 className="study-plan__card-title">Study Details</h2>
            <form className="study-plan__form" onSubmit={handleSubmit}>
              <div className="study-plan__field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  placeholder="e.g. Biology, Calculus"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  required
                />
              </div>

              <div className="study-plan__field">
                <label htmlFor="examDate">Exam Date</label>
                <input
                  id="examDate"
                  type="date"
                  value={examDate}
                  onChange={(event) => setExamDate(event.target.value)}
                  required
                />
              </div>

              <div className="study-plan__field">
                <label htmlFor="hoursPerDay">Hours Per Day</label>
                <input
                  id="hoursPerDay"
                  type="number"
                  min="1"
                  max="12"
                  step="0.5"
                  placeholder="e.g. 2"
                  value={hoursPerDay}
                  onChange={(event) => setHoursPerDay(event.target.value)}
                  required
                />
              </div>

              <div className="study-plan__field">
                <label htmlFor="pdf">Upload Notes PDF</label>
                <input
                  id="pdf"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                />
              </div>

              {error && (
                <p className="study-plan__error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="study-plan__button" disabled={loading}>
                {loading ? "Generating..." : "Generate Plan"}
              </button>
            </form>
          </section>
          
          {pdfContent && (
            <section className="study-plan__card">
              <h2>PDF Content Preview</h2>

              <p>
                {pdfContent.substring(0, 500)}
              </p>
            </section>
          )}

          {plan && (
            <section
              className="study-plan__card study-plan__result-card"
              aria-live="polite"
            >
              <h2 className="study-plan__result-title">
                📅 Personalized Study Plan
              </h2>
              <p className="study-plan__result-meta">
                <span>{subject}</span>
                <span>Exam: {examDate}</span>
                <span>{hoursPerDay} hrs/day</span>
                <span>{daysLeft} days left</span>
              </p>
              <ol className="study-plan__days">
                {plan.plan?.map((day,index) => (
                  <li key={index} className="study-plan__day">
                    <span className="study-plan__day-number">
                      {day.day}
                    </span>
                
                    <div className="study-plan__day-content">
                      <span className="study-plan__day-text">
                        {day.topic}
                      </span>
                  
                      {day.goal && (
                        <span className="study-plan__day-label">
                          🎯 {day.goal}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              <Link to="/quiz" state={{
                subject:plan.subject
              }}>
                <button className="study-plan__quiz-btn">Start Quiz</button>
              </Link>
              
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudyPlan
