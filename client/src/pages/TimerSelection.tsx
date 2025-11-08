import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createStudySession } from '../firebase/studyService'

// values in minutes; use 0.5 for 30 seconds demo mode, -1 for continuous
const options = [0.5, 30, 45, 60, -1]

const TimerSelection: React.FC = () => {
  const navigate = useNavigate()

  const subjectRaw = localStorage.getItem('lockedin:subject')
  const subject = subjectRaw ? JSON.parse(subjectRaw) : null

  const handleSelect = async (opt: number) => {
    if (!subject) {
      alert('Please select a subject first')
      navigate('/subject')
      return
    }

    const mode = opt === -1 ? 'continuous' : 'minutes'
    const durationMinutes = opt === -1 ? 0 : opt

    // choose break interval/duration depending on demo mode
    // defaults: break every 10 minutes (600s) for 10-minute intervals, break duration 2 minutes (120s)
    let breakIntervalSeconds = 600
    let breakDurationSeconds = 120
    if (opt === 0.5) {
      // demo/presentation mode: 30 seconds session, break every 10 seconds, break lasts 15 seconds
      breakIntervalSeconds = 10
      breakDurationSeconds = 15
    }

    // create session in firestore
    try {
      const sessionId = await createStudySession({
        subject: subject.name,
        mode: mode as any,
        durationMinutes,
        breakIntervalSeconds,
        breakDurationSeconds,
      })
      // store session info locally so MainTimer can read it
      const start = Date.now()
      localStorage.setItem('lockedin:session', JSON.stringify({ sessionId, subject: subject.name, subjectId: subject.id, mode, durationMinutes, breakIntervalSeconds, breakDurationSeconds, start }))
      navigate('/main')
    } catch (err) {
      console.error(err)
      alert('Failed to create session')
    }
  }

  return (
    <div style={{ padding: 32, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <button onClick={() => navigate('/subject')}>Back</button>
      <h2 style={{ marginTop: 8 }}>Choose a study duration</h2>
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        {options.map((opt) => (
          <button key={String(opt)} onClick={() => handleSelect(opt)} style={{ padding: '12px 18px' }}>
            {opt === -1 ? 'Continuous Studying' : opt === 0.5 ? '30 Seconds' : `${opt} Minutes`}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TimerSelection
