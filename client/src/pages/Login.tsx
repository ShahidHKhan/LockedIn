import React, { useState } from 'react'
import logo from '../assets/LockedInLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif', padding: 20 },
  card: { width: '90%', maxWidth: 920, background: '#ffffff', padding: '32px 28px', borderRadius: 12, boxShadow: '0 6px 18px rgba(15,23,42,0.06)' },
  brand: { textAlign: 'center', marginBottom: 18 },
  title: { margin: 0, fontSize: 22, fontWeight: 700, color: '#0f172a' },
  subtitle: { marginTop: 6, fontSize: 13, color: '#475569' },
  logo: { display: 'block', margin: '8px auto 16px', width: 84, height: 'auto' },
  topLogo: { display: 'block', margin: '20px auto', width: 220, maxWidth: '48%', height: 'auto' },
  field: { display: 'flex', flexDirection: 'column', marginBottom: 14 },
  label: { fontSize: 13, color: '#334155', marginBottom: 6 },
  input: { padding: '12px 14px', borderRadius: 8, border: '1px solid #e6eef8', fontSize: 14, outline: 'none', transition: 'box-shadow 120ms, border-color 120ms' },
  inputFocus: { boxShadow: '0 6px 18px rgba(37,99,235,0.12)', borderColor: '#2563eb' },
  button: { width: '100%', padding: '12px 14px', borderRadius: 10, border: 'none', background: 'linear-gradient(90deg,#2563eb,#3b82f6)', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 15 },
  footer: { marginTop: 14, textAlign: 'center', color: '#475569', fontSize: 13 },
  smallLink: { color: '#2563eb', textDecoration: 'none', fontWeight: 600 },
  error: { color: '#b91c1c', marginBottom: 8, fontSize: 13 }
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/home')
    } catch (err: any) {
      setError(err?.message || 'Failed to log in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  // local state to track focus (for nicer input shadow)
  const [focused, setFocused] = useState<string | null>(null)

  return (
    <div style={styles.page}>
      {/* big logo at top of page */}
      <div style={styles.card}>
        <div style={styles.brand}>
          {/* replace brand text with smaller logo in same position */}
          <img src={logo} alt="LockedIn" style={styles.logo} />
          <div style={styles.subtitle}>Sign in to your account</div>
        </div>

        <form onSubmit={handleLogin}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={{ ...styles.input, ...(focused === 'email' ? styles.inputFocus : {}) }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={{ ...styles.input, ...(focused === 'password' ? styles.inputFocus : {}) }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button style={styles.button} type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
        </form>

        <div style={styles.footer}>
          Don't have an account? <Link to="/register" style={styles.smallLink}>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login