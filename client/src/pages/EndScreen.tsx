import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/LockedInLogo.png'

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif', padding: 20 },
  card: { width: '92%', maxWidth: 720, background: '#ffffff', padding: 28, borderRadius: 12, boxShadow: '0 8px 24px rgba(15,23,42,0.06)', textAlign: 'center' },
  topLogo: { display: 'block', margin: '10px auto 8px', width: 180, height: 'auto' },
  title: { margin: '18px 0 8px', fontSize: 28, fontWeight: 800, color: '#0f172a' },
  subtitle: { margin: 0, fontSize: 18, color: '#475569' },
  minutes: { marginTop: 14, fontSize: 42, fontWeight: 900, color: '#6b4b2a' },
  actions: { marginTop: 22, display: 'flex', gap: 12, justifyContent: 'center' },
  homeButton: { padding: '10px 14px', background: '#F3E9DE', color: '#6b4b2a', border: '1px solid #e6d6c4', borderRadius: 8, cursor: 'pointer' },
}

const EndScreen: React.FC = () => {
  const loc = useLocation()
  const navigate = useNavigate()
  const state: any = loc.state || {}
  const subject = state.subject || 'Study'
  const minutes = state.durationMinutes || 0

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img src={logo} alt="LockedIn" style={styles.topLogo} />
        <h2 style={styles.title}>Session Complete</h2>
        <p style={styles.subtitle}>Nice work! You LockedIn for that session.</p>

        <div style={styles.minutes}>
          You studied {subject} for {minutes} minute{minutes === 1 ? '' : 's'}
        </div>

        <div style={styles.actions}>
          <button aria-label="go-home" onClick={() => navigate('/home')} style={styles.homeButton}>Home</button>
        </div>
      </div>
    </div>
  )
}

export default EndScreen
