import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { endStudySession } from '../firebase/studyService'
import logo from '../assets/LockedInLogo.png'
import christ1 from '../assets/Christian.png'
import christ2 from '../assets/Christian2.png'

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = Math.floor(totalSeconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const MainTimer: React.FC = () => {
  const navigate = useNavigate()
  const [session, setSession] = useState<any>(null)
  const [elapsed, setElapsed] = useState<number>(0)
  const intervalRef = useRef<number | null>(null)
  const imgRef = useRef<number | null>(null)
  const [showFirst, setShowFirst] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem('lockedin:session')
    if (!raw) {
      navigate('/home')
      return
    }
    const parsed = JSON.parse(raw)
    setSession(parsed)

  const startMs = parsed.start || parsed.startTime || parsed.startMs || Date.now()
  const initialElapsed = Math.floor((Date.now() - startMs) / 1000)
    setElapsed(initialElapsed)

    intervalRef.current = window.setInterval(() => {
      setElapsed((e) => e + 1)
    }, 1000) as unknown as number

    // image swap every 1 second
    imgRef.current = window.setInterval(() => {
      setShowFirst((s) => !s)
    }, 1000) as unknown as number

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
      if (imgRef.current) window.clearInterval(imgRef.current)
    }
  }, [navigate])

  useEffect(() => {
    if (!session) return
    const mode = session.mode
    const breakInterval = session.breakIntervalSeconds ?? 600
    const target = mode === 'continuous' ? null : session.durationMinutes * 60

    if (mode === 'continuous') {
      if (elapsed > 0 && elapsed % breakInterval === 0) {
        localStorage.setItem('lockedin:session', JSON.stringify({ ...session, elapsed }))
        navigate('/breakDisplay')
      }
    } else {
      if (target !== null && elapsed >= target) {
        finishAndGoToEnd()
        return
      }
      if (elapsed > 0 && elapsed % breakInterval === 0) {
        localStorage.setItem('lockedin:session', JSON.stringify({ ...session, elapsed }))
        navigate('/breakDisplay')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed, session])

  const finishAndGoToEnd = async () => {
    if (!session) return
    try {
      const finalMinutes = Math.ceil(elapsed / 60)
      await endStudySession(session.sessionId, finalMinutes)
    } catch (err) {
      console.error(err)
    }
    navigate('/endScreen', { state: { subject: session.subject, durationMinutes: Math.ceil(elapsed / 60) } })
  }

  if (!session) return null

  const isContinuous = session.mode === 'continuous'
  const timeLeft = isContinuous ? null : Math.max(0, session.durationMinutes * 60 - elapsed)

  const breakInterval = session.breakIntervalSeconds ?? 600
  const nextBreakAt = Math.ceil((elapsed + 1) / breakInterval) * breakInterval
  const untilNextBreak = Math.max(0, nextBreakAt - elapsed)

  return (
    <div style={{ padding: 32, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <img src={logo} alt="LockedIn" style={{ width: 140, display: 'block', marginBottom: 12 }} />
      <h2>{session.subject}</h2>
      <div style={{ fontSize: 48, fontWeight: 700 }}>{isContinuous ? formatTime(elapsed) : formatTime(timeLeft ?? 0)}</div>

      <div style={{ marginTop: 12, textAlign: 'center' }}>Time Until Next Break: {formatTime(untilNextBreak)}</div>

      {/* Progress bar synced to time until next break */}
      <div style={{ width: '100%', maxWidth: 560, margin: '12px auto 0', padding: '6px 8px' }}>
        <div style={{ height: 12, background: '#e6e6e6', borderRadius: 8, overflow: 'hidden' }}>
          {/** progress is fraction of breakInterval that has elapsed since last break */}
          <div
            style={{
              height: '100%',
              width: `${Math.min(100, Math.max(0, ((elapsed % breakInterval) / breakInterval) * 100))}%`,
              background: '#C9A178',
              transition: 'width 400ms linear',
            }}
          />
        </div>
      </div>

      {/* Centered cycling image below the countdown (no visual effects) */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
        <img
          src={showFirst ? christ1 : christ2}
          alt="Christian"
          style={{ width: 240, height: 240, objectFit: 'contain', backgroundColor: 'transparent', borderRadius: 0, boxShadow: 'none' }}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={finishAndGoToEnd} style={{ padding: '10px 14px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8 }}>End Studying</button>
        </div>
      </div>
    </div>
  )
}

export default MainTimer
