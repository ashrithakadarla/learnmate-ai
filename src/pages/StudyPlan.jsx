import { useState } from 'react'
import './StudyPlan.css'

const SAMPLE_PLAN = [
  'Day 1: Introduction and Basics',
  'Day 2: Core Concepts',
  'Day 3: Practice Problems',
  'Day 4: Advanced Topics',
  'Day 5: Revision and Mock Test',
]

function StudyPlan() {
  const [subject, setSubject] = useState('')
  const [examDate, setExamDate] = useState('')
  const [hoursPerDay, setHoursPerDay] = useState('')
  const [plan, setPlan] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    setPlan(SAMPLE_PLAN)
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

              <button type="submit" className="study-plan__button">
                Generate Plan
              </button>
            </form>
          </section>

          {plan && (
            <section
              className="study-plan__card study-plan__result-card"
              aria-live="polite"
            >
              <h2 className="study-plan__result-title">
                📅 Personalized Study Plan
              </h2>
              {subject && (
                <p className="study-plan__result-meta">
                  <span>{subject}</span>
                  {examDate && <span>Exam: {examDate}</span>}
                  {hoursPerDay && <span>{hoursPerDay} hrs/day</span>}
                </p>
              )}
              <ol className="study-plan__days">
                {plan.map((day, index) => (
                  <li key={day} className="study-plan__day">
                    <span className="study-plan__day-number">{index + 1}</span>
                    <span className="study-plan__day-text">{day}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudyPlan
