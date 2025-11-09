import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { db } from '../firebase/config'
import { collection, query, where, getDocs } from 'firebase/firestore'
import LockedInLogo from "../assets/LockedInLogo.png"
import StudyLogo from '../assets/StudyLogo.png'
import HistoryLogo from '../assets/HistoryLogo.png'

const styles: Record<string, React.CSSProperties> = {
  h1: {paddingTop:'50px'},
  container: { maxWidth: 1200, margin: '8px auto', padding: 24, borderRadius: 8, fontFamily: 'Inter, system-ui, sans-serif' },
  hero: { minHeight: '80vh', borderRadius: 14, overflow: 'hidden', display: 'flex', alignItems: 'center', background: 'transparent', color: '#0f172a', boxShadow: 'none', position: 'relative' },
  heroInner: { display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', padding: '20px 56px' },
  headerRight: { position: 'absolute', top: 18, right: 28, display: 'flex', gap: 12, alignItems: 'center' },
  left: { flex: 1, paddingRight: 24 },
  right: { flex: 1, display: 'flex', justifyContent: 'center', gap: 24 },
  btn: { padding: '8px 12px', borderRadius: 6, border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer' },
  frameBtn: { width: 320, height: 320, borderRadius: 14, background: 'transparent', boxShadow: 'none', border: 'none', cursor: 'pointer', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  frameImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', opacity: 0.98 },
  frameLabel: { position: 'relative', zIndex: 2, color: '#0f172a', fontWeight: 900, fontSize: 24, letterSpacing: '0.4px', textAlign: 'center', padding: '14px 20px' },
  studyLogo: { width: '64%', height: 'auto', zIndex: 2 },
  historyLogo: { width: '64%', height: 'auto', zIndex: 2 },
  heroTitle: { fontSize: 42, lineHeight: 1.02, margin: 0, fontWeight: 800, color: '#0f172a' },
  heroLead: { marginTop: 14, color: '#475569', fontSize: 16, maxWidth: 520 },
    headerBar: { width: '100%', background: '#fafafa', borderBottom: '1px solid #ececec', position: 'sticky', top: 0, zIndex: 60 },
    headerInner: { maxWidth: 1200, margin: '0 auto', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    navLinks: { display: 'flex', gap: 12, alignItems: 'center' },
    navLinkBtn: { padding: '6px 10px', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#0f172a', fontWeight: 700 },
  studyCount: { 
    textAlign: 'center', 
    fontSize: 24, 
    fontWeight: 600, 
    color: '#0f172a', 
    margin: '32px 0',
    padding: '16px 24px',
    background: '#f8fafc',
    borderRadius: 12,
    border: '1px solid #e2e8f0'
  }
}

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [studySessionCount, setStudySessionCount] = useState<number>(0)
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      if (!u) {
        navigate('/login')
      } else {
        fetchStudySessionCount(u.uid)
      }
    })
    return () => unsub()
  }, [navigate])

  const fetchStudySessionCount = async (userId: string) => {
    try {
      const studySessionsRef = collection(db, 'studySessions')
      const q = query(studySessionsRef, where('userId', '==', userId))
      const querySnapshot = await getDocs(q)
      setStudySessionCount(querySnapshot.size)
    } catch (error) {
      console.error('Error fetching study sessions:', error)
      setStudySessionCount(0)
    }
  }

  const handleSignOut = async () => {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <style>{`
        .home-hero { min-height: 80vh; }
        .hero-inner { display: flex; width: 100%; align-items: center; justify-content: space-between; padding: 20px 56px; }
        .hero-right { display: flex; justify-content: center, gap: 24px; }
        .hero-title { font-size: 42px; line-height: 1.02; margin: 0; font-weight: 800; }
        .frame-btn { transition: transform .18s ease, box-shadow .18s ease; border-radius: 14px; }
        .frame-btn:hover { transform: translateY(-6px) scale(1.04); box-shadow: 0 18px 40px rgba(0,0,0,0.45); }
        .frame-btn:focus { outline: 3px solid rgba(201,161,120,0.16); }
        @media (max-width: 900px) {
          .hero-inner { flex-direction: column; padding: 16px; }
          .hero-right { margin-top: 20px; gap: 16px; }
          .frame-btn { width: 240px !important; height: 240px !important; }
        }
        @media (max-width: 420px) {
          .frame-btn { width: 180px !important; height: 180px !important; }
          .hero-title { font-size: 28px; }
        }
      `}</style>

      <div style={styles.headerBar}>
        <div style={styles.headerInner}>
          <img src={LockedInLogo} alt="LockedIn" style={{ width: 140 }} />
          <div style={styles.navLinks}>
          </div>
          <div>
            {user ? (
              <>
                <span style={{ marginRight: 12 }}>Hi, {user.displayName || user.email}</span>
                <button style={styles.btn} onClick={handleSignOut}>Sign out</button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ color: '#0f172a', textDecoration: 'none', marginRight: 12 }}>Login</Link>
                <Link to="/register" style={{ color: '#0f172a', textDecoration: 'none' }}>Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="home-hero" style={styles.hero}>
        <div className="hero-inner" style={styles.heroInner}>
          <div style={styles.left}>
            <img src={LockedInLogo} alt="LockedIn" style={{ width: 160, marginBottom: 12 }} />
            <h1 style={styles.heroTitle}>Unleash focused study time.</h1>
            <p style={styles.heroLead}>Students learn material significantly better when they can teach it or actively repeat the information — active recall beats aimless review.</p>

            <div style={styles.studyCount}>
              You've LockedIn {studySessionCount} times 🔥
            </div>
          </div>

          <div className="hero-right" style={styles.right}>
            <button aria-label="start-study" onClick={() => navigate('/subjectSelection')} className="frame-btn" style={styles.frameBtn}>
              <img src={StudyLogo} alt="Study" style={styles.studyLogo} />
            </button>

            <button aria-label="view-history" onClick={() => navigate('/studyLog')} className="frame-btn" style={styles.frameBtn}>
              <img src={HistoryLogo} alt="History" style={styles.studyLogo} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
