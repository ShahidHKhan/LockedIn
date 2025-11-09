import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import LockedInLogo from "../assets/LockedInLogo.png"
import PadLock from "../assets/PadLock.png"

const styles: Record<string, React.CSSProperties> = {
  h1: {paddingTop:'50px'},
  container: { maxWidth: 880, margin: '48px auto', padding: 24, borderRadius: 8, fontFamily: 'Inter, system-ui, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  card: { paddingTop:'100px', paddingBottom:'130px',padding: 18, borderRadius: 8, boxShadow: '0 4px 18px rgba(0,0,0,0.04)' },
  btn: { padding: '8px 12px', borderRadius: 6, border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer' },
  btn2:{ fontSize: '30px',padding: '8px 100px', borderRadius: 6, border: 'none', background: '#ff7231ff', color: '#fff', cursor: 'pointer'},
  btn3:{ fontSize: '30px',padding: '8px 65px', borderRadius: 6, border: 'none', background: '#ff7231ff', color: '#fff', cursor: 'pointer'},
  btnPos:{ paddingTop:'100px',paddingBottom:'30px'},
  btnPos2: {paddingBottom:'100px'},
  history: {backgroundColor: '#7a7a7aff', fontSize: '20px', paddingTop:'50px', padding: '20px 10px'}
}

const StudyLog: React.FC = () => {
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

  function studyHistory(): void {
    //add DB info to array
    
    
  }
  function newStudy(): void {
    navigate('/subjectSelection');
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={LockedInLogo} alt="Lock" style={{ width: "200px" }} />
        <div>
          {user ? (
            <>
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
        <h1 style={styles.h1}>Study Log</h1>
        <img src={PadLock} alt="PadLock" style={{ width: "300px" }} />
        <div style={styles.btnPos}><button onClick={newStudy} style={styles.btn2}>New Study</button></div>
         
      </div>
    </div>
  )
}

export default StudyLog

