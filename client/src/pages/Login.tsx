import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 420, margin: '48px auto', padding: 24, borderRadius: 8, boxShadow: '0 6px 24px rgba(2,6,23,0.08)', fontFamily: 'Inter, system-ui, sans-serif' },
  title: { marginBottom: 12, textAlign: 'center' },
  field: { display: 'flex', flexDirection: 'column', marginBottom: 12 },
  input: { padding: '10px 12px', borderRadius: 6, border: '1px solid #e6e6e6', fontSize: 14 },
  button: { width: '100%', padding: 10, borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', fontWeight: 600, cursor: 'pointer' },
  footer: { marginTop: 12, textAlign: 'center' },
  error: { color: '#b91c1c', marginBottom: 8 }
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

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome back</h2>
      <form onSubmit={handleLogin}>
        <div style={styles.field}>
          <label>Email</label>
          <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={styles.field}>
          <label>Password</label>
          <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <div style={styles.error}>{error}</div>}
        <button style={styles.button} type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
      </form>

      <div style={styles.footer}>
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

export default Login