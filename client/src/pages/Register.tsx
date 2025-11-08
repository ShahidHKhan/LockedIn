import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/config'

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 520, margin: '40px auto', padding: 24, borderRadius: 8, boxShadow: '0 6px 24px rgba(0,0,0,0.06)', fontFamily: 'Inter, system-ui, sans-serif' },
  title: { marginBottom: 12, textAlign: 'center' },
  field: { display: 'flex', flexDirection: 'column', marginBottom: 12 },
  input: { padding: '10px 12px', borderRadius: 6, border: '1px solid #e6e6e6', fontSize: 14 },
  button: { width: '100%', padding: 10, borderRadius: 6, border: 'none', background: '#059669', color: '#fff', fontWeight: 600, cursor: 'pointer' },
  footer: { marginTop: 12, textAlign: 'center' },
  error: { color: '#b91c1c', marginBottom: 8 }
}

const Register: React.FC = () => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) {
        await updateProfile(userCredential.user, { displayName })
      }
      navigate('/home')
    } catch (err: any) {
      setError(err?.message || 'Failed to create account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create an account</h2>
      <form onSubmit={handleRegister}>
        <div style={styles.field}>
          <label>Your name (optional)</label>
          <input style={styles.input} value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Jane Doe" />
        </div>

        <div style={styles.field}>
          <label>Email</label>
          <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div style={styles.field}>
          <label>Password</label>
          <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button style={styles.button} type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</button>
      </form>

      <div style={styles.footer}>
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </div>
  )
}

export default Register
