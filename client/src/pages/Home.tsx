import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: 880, margin: '48px auto', padding: 24, borderRadius: 8, fontFamily: 'Inter, system-ui, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  card: { paddingBottom:'130px',padding: 18, borderRadius: 8, boxShadow: '0 4px 18px rgba(0,0,0,0.04)' },
  btn: { padding: '8px 12px', borderRadius: 6, border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer' },
  btn2:{ fontSize: '30px',padding: '8px 100px', borderRadius: 6, border: 'none', background: '#ff7231ff', color: '#fff', cursor: 'pointer'},
  btn3:{ fontSize: '30px',padding: '8px 114px', borderRadius: 6, border: 'none', background: '#ff7231ff', color: '#fff', cursor: 'pointer'},
  btnPos:{ paddingTop:'250px',paddingBottom:'30px'},
}

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      if (!u) {
        navigate('/login')
      }
    })
    return () => unsub()
  }, [navigate])

  const handleSignOut = async () => {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>LockedIn</h2>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: 12 }}>Hello, {user.displayName || user.email}</span>
              <button style={styles.btn} onClick={handleSignOut}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>

      <div style={styles.card}>
        <h3>Welcome{user ? `, ${user.displayName || ''}` : ''} 👋</h3>
        <div style={styles.btnPos}><button style={styles.btn2} onClick={() => navigate('/subject')}>Study</button></div>
        <div><button style={styles.btn3} onClick={() => navigate('/log')}>Log</button></div>
      </div>
    </div>
  )
}

export default Home
