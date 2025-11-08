import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const EndScreen: React.FC = () => {
  const loc = useLocation()
  const navigate = useNavigate()
  const state: any = loc.state || {}
  const subject = state.subject || 'Study'
  const minutes = state.durationMinutes || 0

  return (
    <div style={{ padding: 32, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h2>You Studied {subject} for {minutes} minute{minutes === 1 ? '' : 's'}!</h2>
      <div style={{ marginTop: 18 }}>
        <button onClick={() => navigate('/home')}>Home</button>
      </div>
    </div>
  )
}

export default EndScreen
