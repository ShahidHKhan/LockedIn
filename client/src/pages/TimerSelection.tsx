import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createStudySession } from '../firebase/studyService'
import FrameImg from '../assets/SubjectFrame.png'

// values in minutes; use 0.5 for 30 seconds demo mode, -1 for continuous
const options = [0.5, 30, 45, 60, -1]

const TimerSelection: React.FC = () => {
  const navigate = useNavigate()

  const subjectRaw = localStorage.getItem('lockedin:subject')
  const subject = subjectRaw ? JSON.parse(subjectRaw) : null
  const subjectName = subject ? (subject.subjectName || subject.name || subject) : null
  const subjectId = subject ? (subject.categoryId || subject.id || null) : null

  const [index, setIndex] = useState(1) // default to 30 minutes
  const [shake, setShake] = useState(false)

  useEffect(() => {
    setShake(true)
    const t = setTimeout(() => setShake(false), 360)
    return () => clearTimeout(t)
  }, [index])

  const optionLabel = (opt: number) => opt === -1 ? 'Continuous' : opt === 0.5 ? '30 Seconds' : `${opt} Minutes`

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
        subject: subjectName || 'Unknown',
        mode: mode as any,
        durationMinutes,
        breakIntervalSeconds,
        breakDurationSeconds,
      })
      // store session info locally so MainTimer can read it
      const start = Date.now()
      localStorage.setItem('lockedin:session', JSON.stringify({ sessionId, subject: subjectName, subjectId, mode, durationMinutes, breakIntervalSeconds, breakDurationSeconds, start }))
      navigate('/main')
    } catch (err) {
      console.error(err)
      alert('Failed to create session')
    }
  }

  return (
    <div style={{ padding: 28, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <button onClick={() => navigate('/subject')} style={{ padding: '8px 12px', background: '#F3E9DE', color: '#6b4b2a', border: '1px solid #e6d6c4', borderRadius: 8 }}>Back</button>
      <h2 style={{ marginTop: 12 }}>Choose a study duration</h2>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 18 }}>
        <button aria-label="prev-time" onClick={() => setIndex((i) => (i - 1 + options.length) % options.length)} style={{ padding: 12, background: '#C9A178', color: '#fff', border: 'none', borderRadius: 8 }}>◀</button>

        <div>
          {/* small shake CSS local to this component */}
          <style>{`@keyframes shake {0% { transform: translateX(0); } 20% { transform: translateX(-8px) rotate(-1deg); } 40% { transform: translateX(6px) rotate(1deg); } 60% { transform: translateX(-4px) rotate(-0.5deg); } 80% { transform: translateX(2px) rotate(0.5deg); } 100% { transform: translateX(0); }} .shake { animation: shake 360ms cubic-bezier(.36,.07,.19,.97); }`}</style>
          <div style={{ position: 'relative', width: 'min(64vw,480px)', height: 'min(64vw,480px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={FrameImg} alt="time frame" className={shake ? 'shake' : ''} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', pointerEvents: 'none' }}>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{optionLabel(options[index])}</div>
            </div>
          </div>
        </div>

        <button aria-label="next-time" onClick={() => setIndex((i) => (i + 1) % options.length)} style={{ padding: 12, background: '#C9A178', color: '#fff', border: 'none', borderRadius: 8 }}>▶</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18, gap: 12 }}>
        <button onClick={() => handleSelect(options[index])} style={{ padding: '10px 18px', background: '#C9A178', color: '#fff', border: 'none', borderRadius: 8 }}>Confirm</button>
      </div>
    </div>
  )
}

export default TimerSelection
