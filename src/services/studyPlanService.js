/**
 * Study plan generation service.
 *
 * Swap `fetchStudyPlan` with a Flask API call when the backend is ready.
 * The component should only call `fetchStudyPlan` — not `generateStudyPlan` directly.
 */

export const STUDY_PHASES = [
  {
    phase: 'basics',
    label: 'Basics',
    weight: 1,
    buildTopic: (subject) => `${subject} — Introduction and Basics`,
  },
  {
    phase: 'core',
    label: 'Core Concepts',
    weight: 2,
    buildTopic: (subject) => `${subject} — Core Concepts`,
  },
  {
    phase: 'practice',
    label: 'Practice Problems',
    weight: 3,
    buildTopic: (subject) => `${subject} — Practice Problems`,
  },
  {
    phase: 'advanced',
    label: 'Advanced Topics',
    weight: 2,
    buildTopic: (subject) => `${subject} — Advanced Topics`,
  },
  {
    phase: 'revision',
    label: 'Revision',
    weight: 1,
    buildTopic: (subject) => `${subject} — Revision and Mock Test`,
  },
]

/**
 * @param {string} examDate - ISO date string (YYYY-MM-DD)
 * @returns {number}
 */
export function calculateDaysRemaining(examDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const exam = new Date(`${examDate}T00:00:00`)
  exam.setHours(0, 0, 0, 0)

  const diffMs = exam.getTime() - today.getTime()
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}

/**
 * Distribute study phases across available days using phase weights.
 * The final day is always reserved for revision.
 * @param {number} totalDays
 * @returns {typeof STUDY_PHASES[number][]}
 */
export function buildSchedule(totalDays) {
  if (totalDays <= 0) {
    return []
  }

  const revisionPhase = STUDY_PHASES[STUDY_PHASES.length - 1]

  if (totalDays === 1) {
    return [revisionPhase]
  }

  const learningPhases = STUDY_PHASES.slice(0, -1)
  const learningDays = totalDays - 1

  if (learningDays <= learningPhases.length) {
    return [...learningPhases.slice(0, learningDays), revisionPhase]
  }

  const totalWeight = learningPhases.reduce((sum, phase) => sum + phase.weight, 0)
  const counts = learningPhases.map((phase) =>
    Math.floor((learningDays * phase.weight) / totalWeight),
  )

  let allocated = counts.reduce((sum, count) => sum + count, 0)
  let remainder = learningDays - allocated
  let index = 0

  while (remainder > 0) {
    counts[index % learningPhases.length] += 1
    remainder -= 1
    index += 1
  }

  while (allocated > learningDays) {
    const reduceIndex = counts.findIndex((count) => count > 0)
    if (reduceIndex === -1) break
    counts[reduceIndex] -= 1
    allocated -= 1
  }

  const learningSchedule = learningPhases.flatMap((phase, phaseIndex) =>
    Array.from({ length: counts[phaseIndex] }, () => phase),
  )

  return [...learningSchedule, revisionPhase]
}

/**
 * @param {{ subject: string, examDate: string, hoursPerDay: number }} params
 * @returns {{ success: true, plan: object } | { success: false, error: string }}
 */
export function generateStudyPlan({ subject, examDate, hoursPerDay }) {
  const trimmedSubject = subject.trim()
  const hours = Number(hoursPerDay)
  const daysRemaining = calculateDaysRemaining(examDate)

  if (!trimmedSubject) {
    return { success: false, error: 'Please enter a subject.' }
  }

  if (!Number.isFinite(hours) || hours <= 0) {
    return { success: false, error: 'Please enter a valid number of hours per day.' }
  }

  if (daysRemaining <= 0) {
    return {
      success: false,
      error: 'Please choose an exam date in the future.',
    }
  }

  const schedule = buildSchedule(daysRemaining)

  const days = schedule.map((phase, index) => ({
    dayNumber: index + 1,
    phase: phase.phase,
    label: phase.label,
    topic: phase.buildTopic(trimmedSubject),
    hours,
  }))

  return {
    success: true,
    plan: {
      subject: trimmedSubject,
      examDate,
      hoursPerDay: hours,
      daysRemaining,
      totalStudyHours: daysRemaining * hours,
      days,
    },
  }
}

/**
 * Entry point for the UI. Replace the body with a Flask API request later.
 *
 * @example
 * // Future Flask integration:
 * // const response = await fetch('/api/study-plan', {
 * //   method: 'POST',
 * //   headers: { 'Content-Type': 'application/json' },
 * //   body: JSON.stringify(params),
 * // })
 * // return response.json()
 *
 * @param {{ subject: string, examDate: string, hoursPerDay: number }} params
 */
export async function fetchStudyPlan(params) {
  return generateStudyPlan(params)
}
