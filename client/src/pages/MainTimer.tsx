import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { endStudySession } from '../firebase/studyService'
import logo from '../assets/LockedInLogo.png'
import { playBell } from '../utils/sound'

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

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [navigate])

  useEffect(() => {
    if (!session) return
    const mode = session.mode
    const breakInterval = session.breakIntervalSeconds ?? 600
    const target = mode === 'continuous' ? null : session.durationMinutes * 60

    if (mode === 'continuous') {
      if (elapsed > 0 && elapsed % breakInterval === 0) {
        // signal break with a bell then navigate
        playBell()
        localStorage.setItem('lockedin:session', JSON.stringify({ ...session, elapsed }))
        // small delay so bell can start before route change
        setTimeout(() => navigate('/break'), 200)
      }
    } else {
      if (target !== null && elapsed >= target) {
        finishAndGoToEnd()
        return
      }
      if (elapsed > 0 && elapsed % breakInterval === 0) {
        playBell()
        localStorage.setItem('lockedin:session', JSON.stringify({ ...session, elapsed }))
        setTimeout(() => navigate('/break'), 200)
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
    navigate('/end', { state: { subject: session.subject, durationMinutes: Math.ceil(elapsed / 60) } })
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

      <div style={{ marginTop: 12 }}>Time Until Next Break: {formatTime(untilNextBreak)}</div>

      <div style={{ marginTop: 20 }}>
        <button onClick={finishAndGoToEnd} style={{ padding: '10px 14px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8 }}>End Studying</button>
      </div>
    </div>
  )
}

export default MainTimer
