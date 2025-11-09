import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { endStudySession } from '../firebase/studyService'
import logo from '../assets/LockedInLogo.png'

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif', padding: 20 },
  card: { width: '94%', maxWidth: 720, background: '#ffffff', padding: 24, borderRadius: 12, boxShadow: '0 8px 24px rgba(15,23,42,0.06)', textAlign: 'center' },
  logo: { display: 'block', margin: '6px auto 10px', width: 140, height: 'auto' },
  heading: { margin: '8px 0 6px', fontSize: 22, fontWeight: 700, color: '#0f172a' },
  timer: { fontSize: 44, fontWeight: 800, color: '#0f172a', marginTop: 6 },
  progressWrap: { width: '100%', maxWidth: 560, margin: '14px auto 0', padding: '6px 8px' },
  progressBg: { height: 12, background: '#e6e6e6', borderRadius: 8, overflow: 'hidden' },
  progressFill: { height: '100%', background: '#C9A178', transition: 'width 400ms linear' },
  actions: { marginTop: 18, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' },
  primaryBtn: { padding: '8px 12px', background: '#C9A178', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' },
  paleBtn: { padding: '8px 12px', background: '#F3E9DE', color: '#6b4b2a', border: '1px solid #e6d6c4', borderRadius: 8, cursor: 'pointer' },
  endBtn: { padding: '8px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' },
}

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = Math.floor(totalSeconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const BreakDisplay: React.FC = () => {
  const navigate = useNavigate()
  const [left, setLeft] = useState<number>(120)
  const [total, setTotal] = useState<number>(120)
  const [showContinue, setShowContinue] = useState(false)

  useEffect(() => {
    // initialize left from session if available
    const raw = localStorage.getItem('lockedin:session')
    const s = raw ? JSON.parse(raw) : null
    const initial = s?.breakDurationSeconds ?? 120
    setLeft(initial)
    setTotal(initial)
    const interval = window.setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          setShowContinue(true)
          clearInterval(interval)
          return 0
        }
        return l - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const onContinue = () => {
    // return to main timer
    navigate('/mainTimer')
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
    navigate('/endScreen', { state: { subject: s.subject, durationMinutes: finalMinutes } })
  }

  const elapsed = Math.max(0, total - left)
  const progressPct = total > 0 ? Math.min(100, Math.round((elapsed / total) * 100)) : 0

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img src={logo} alt="LockedIn" style={styles.logo} />
        <h2 style={styles.heading}>Break Time</h2>

        <div style={styles.timer}>{formatTime(left)}</div>

        {/* Progress bar for break countdown */}
        <div style={styles.progressWrap}>
          <div style={styles.progressBg}>
            <div style={{ ...styles.progressFill, width: `${progressPct}%` }} />
          </div>
        </div>

        <div style={styles.actions}>
          {showContinue ? (
            <button onClick={onContinue} style={styles.primaryBtn}>Continue</button>
          ) : (
            <div style={{ color: '#64748b', alignSelf: 'center', padding: '8px 12px' }}>Take a short break</div>
          )}

          <button onClick={() => navigate('/notesAIDisplay')} style={styles.paleBtn}>Notes</button>
          <button onClick={onEnd} style={styles.endBtn}>End</button>
        </div>
      </div>
    </div>
  )
}

export default BreakDisplay
