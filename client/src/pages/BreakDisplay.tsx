import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { endStudySession } from '../firebase/studyService'
import { playBell } from '../utils/sound'

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = Math.floor(totalSeconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const BreakDisplay: React.FC = () => {
  const navigate = useNavigate()
  const [left, setLeft] = useState<number>(120)
  const [showContinue, setShowContinue] = useState(false)

  useEffect(() => {
    // initialize left from session if available
    const raw = localStorage.getItem('lockedin:session')
    const s = raw ? JSON.parse(raw) : null
    const initial = s?.breakDurationSeconds ?? 120
    setLeft(initial)
    // play bell when break starts
    playBell()

    const interval = window.setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          setShowContinue(true)
          clearInterval(interval)
          // play bell when break ends
          playBell()
          return 0
        }
        return l - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const onContinue = () => {
    // return to main timer
    navigate('/main')
  }

  const onEnd = async () => {
    const raw = localStorage.getItem('lockedin:session')
    if (!raw) return navigate('/home')
    const s = JSON.parse(raw)
    const finalMinutes = Math.ceil((s.elapsed || 0) / 60)
    try {
      await endStudySession(s.sessionId, finalMinutes)
    } catch (err) {
      console.error(err)
    }
    navigate('/end', { state: { subject: s.subject, durationMinutes: finalMinutes } })
  }

  return (
    <div style={{ padding: 32, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h2>Break Time Left</h2>
      <div style={{ fontSize: 36, fontWeight: 700 }}>{formatTime(left)}</div>

      <div style={{ marginTop: 18 }}>
        {showContinue ? (
          <button onClick={onContinue} style={{ padding: '8px 12px', marginRight: 8 }}>Continue</button>
        ) : (
          <div style={{ color: '#64748b' }}>Take a short break</div>
        )}
        <button onClick={() => navigate('/notes')} style={{ marginLeft: 8 }}>Notes</button>
        <button onClick={() => alert('Try a quick stretch: reach for the sky and hold 20s')} style={{ marginLeft: 8 }}>Stretch</button>
        <button onClick={onEnd} style={{ marginLeft: 8, background: '#ef4444', color: '#fff' }}>End</button>
      </div>
    </div>
  )
}

export default BreakDisplay
