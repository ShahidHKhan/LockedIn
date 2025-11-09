import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LockedInLogo from '../assets/LockedInLogo.png'
import Christian2 from '../assets/Christian2.png'

export default function NotesAIDisplay() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAskAI = async () => {
    if (!input.trim()) return
    setLoading(true)
    setResponse('')

  // Use Vite env var if set, otherwise fall back to the deployed Render API (working) or dev proxy
  const apiUrl = (import.meta as any).env?.VITE_API_URL || 'https://lockedin-1m1h.onrender.com/ask' || '/ask'

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'test', input })
      })

      // If server returned non-JSON (or an error), handle gracefully
      if (!res.ok) {
        let text = 'Error from assistant.'
        try { text = await res.text() } catch (e) { /* ignore */ }
        setResponse(text || 'Error from assistant.')
        return
      }

      const data = await res.json()
      setResponse(data?.response || 'No response received.')
    } catch (err) {
      setResponse('❌ Failed to reach server. Make sure the backend is running.')
      // eslint-disable-next-line no-console
      console.error('NotesAIDisplay fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const styles: Record<string, React.CSSProperties> = {
    page: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 24, background: 'transparent', fontFamily: 'Inter, system-ui, sans-serif' },
    card: { width: '100%', maxWidth: 960, marginTop: 28, background: 'rgba(255,255,255,0.9)', borderRadius: 14, boxShadow: '0 10px 30px rgba(2,6,23,0.08)', overflow: 'hidden' },
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid #f1f5f9', gap: 20 },
    logo: { height: 64, objectFit: 'contain' },
    titleGroup: { display: 'flex', flexDirection: 'column' },
    title: { margin: 0, fontSize: 24, fontWeight: 800, color: '#0f172a' },
    subtitle: { marginTop: 6, color: '#475569', fontSize: 15 },
    body: { display: 'flex', gap: 24, padding: 28, alignItems: 'flex-start' },
    left: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' },
    right: { width: 240, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' },
    textarea: { width: '100%', minHeight: 160, padding: 16, borderRadius: 12, border: '1px solid #e6eef8', fontSize: 15, resize: 'vertical', outline: 'none', boxShadow: 'inset 0 1px 0 rgba(2,6,23,0.02)' },
    promptText: { marginBottom: 12, color: '#334155', fontWeight: 600 },
    controls: { display: 'flex', gap: 12, marginTop: 12, alignItems: 'center' },
    primaryBtn: { padding: '12px 18px', borderRadius: 12, border: 'none', cursor: 'pointer', color: '#fff', fontWeight: 700, background: 'linear-gradient(90deg,#2563eb,#3b82f6)' },
    backBtn: { padding: '8px 12px', borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer', fontWeight: 700 },
    responseCard: { marginTop: 18, background: '#0f172a', color: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 8px 20px rgba(2,6,23,0.12)', whiteSpace: 'pre-wrap' },
    smallNote: { color: '#64748b', fontSize: 13 }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={LockedInLogo} alt="LockedIn" style={styles.logo} />
            <div style={styles.titleGroup}>
              <h2 style={styles.title}>Teach Me</h2>
              <div style={styles.subtitle}>Tell me what you learned, I&apos;ll see if you&apos;re correct!</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={styles.backBtn} aria-label="back" onClick={() => navigate('/breakDisplay')}>Back</button>
          </div>
        </div>

        <div style={styles.body}>
          <div style={styles.left}>
            <div style={styles.promptText}>Write a short explanation of what you learned</div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Explain the concept in your own words..."
              style={styles.textarea}
            />

            <div style={styles.controls}>
              <button style={styles.primaryBtn} onClick={handleAskAI} disabled={loading}>{loading ? 'Checking…' : 'Check my answer'}</button>
              <div style={styles.smallNote}>{response ? 'Result below' : 'We use AI to evaluate your answer.'}</div>
            </div>

            {response && (
              <div style={styles.responseCard}>
                <strong>Feedback:</strong>
                <div style={{ marginTop: 8 }}>{response}</div>
              </div>
            )}
          </div>

          <div style={styles.right}>
            <img src={Christian2} alt="Coach" style={{ width: 180, borderRadius: 12, boxShadow: '0 8px 20px rgba(2,6,23,0.08)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
