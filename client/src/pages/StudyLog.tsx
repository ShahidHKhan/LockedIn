import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import type { User } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import LockedInLogo from "../assets/LockedInLogo.png"
import PadLock from "../assets/PadLock.png"
import StudyLogIMG from "../assets/StudyLogLogo.png"

const styles: Record<string, React.CSSProperties> = {
  h1: {paddingTop:'50px'},
  container: { maxWidth: 880, margin: '48px auto', padding: 24, borderRadius: 8, fontFamily: 'Inter, system-ui, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  card: { paddingTop:'100px', paddingBottom:'130px',padding: 18, borderRadius: 8, boxShadow: '0 4px 18px rgba(0,0,0,0.04)' },
  btn: { padding: '8px 12px', borderRadius: 6, border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer' },
  btn2:{ fontSize: '30px',padding: '8px 100px', borderRadius: 6, border: 'none', background: '#ff7231ff', color: '#fff', cursor: 'pointer'},
  btn3:{ fontSize: '30px',padding: '8px 65px', borderRadius: 6, border: 'none', background: '#ff7231ff', color: '#fff', cursor: 'pointer'},
  btn4:{ marginRight: '10px', padding: '8px 12px', borderRadius: 6, border: 'none', background: '#ff7231ff', color: '#fff', cursor: 'pointer'},
  btnPos:{ paddingTop:'100px',paddingBottom:'30px'},
  btnPos2: {paddingBottom:'100px'},
  studyBubble: {
    background: 'linear-gradient(135deg, #ff7231ff 0%, #ffb366 100%)',
    borderRadius: '15px',
    padding: '16px 20px',
    margin: '12px 0',
    boxShadow: '0 4px 12px rgba(255, 114, 49, 0.2)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer'
  },
  studyBubbleHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(255, 114, 49, 0.3)'
  },
  studyListContainer: {
    maxWidth: 500,
    margin: "20px auto",
    padding: '0 10px'
  },
  paginationContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', gap: '20px' },
  paginationBtn: { padding: '10px 20px', borderRadius: 25, border: 'none', background: '#ff7231ff', color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: '500' },
  paginationBtnDisabled: { padding: '10px 20px', borderRadius: 25, border: 'none', background: '#ccc', color: '#fff', cursor: 'not-allowed', fontSize: '14px', fontWeight: '500' },
  pageInfo: { fontSize: '16px', fontWeight: 'bold', color: '#333' },
  emptyState: {
    textAlign: 'center' as const,
    padding: '40px 20px',
    color: '#666',
    fontSize: '18px',
    border: '2px dashed #ddd',
    borderRadius: '15px',
    margin: '20px 0'
  },
  loadingState: {
    textAlign: 'center' as const,
    padding: '40px 20px',
    color: '#ff7231ff',
    fontSize: '18px',
    fontWeight: '500'
  }
}

interface StudySession {
  id: string;
  subject: string;
  finalDurationMinutes: number;
  createdDate: string;
  createdAt: any;
  mode: string;
}

const StudyLog: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  const [studySessions, setStudySessions] = useState<StudySession[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [hoveredBubble, setHoveredBubble] = useState<string | null>(null)
  const itemsPerPage = 5

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

  function back(): void {
    navigate('/home');
  }

  function newStudy(): void {
    navigate('/subjectSelection');
  }

  useEffect(() => {
    const fetchStudySessions = async () => {
      if (!user) return;
      
      setLoading(true)
      try {
        console.log('Fetching study sessions for user:', user.uid)
        
        // First, try without orderBy in case there's no index
        const q = query(
          collection(db, 'studySessions'),
          where('userId', '==', user.uid)
        )
        
        const querySnapshot = await getDocs(q)
        const sessions: StudySession[] = []
        
        console.log('Query snapshot size:', querySnapshot.size)
        
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          console.log('Document data:', data)
          sessions.push({
            id: doc.id,
            subject: data.subject,
            finalDurationMinutes: data.finalDurationMinutes,
            createdDate: data.createdDate,
            createdAt: data.createdAt,
            mode: data.mode
          })
        })
        
        // Sort manually after fetching (in case Firestore index isn't set up)
        const sortedSessions = sessions.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return b.createdAt.toMillis() - a.createdAt.toMillis()
          }
          // Fallback to string comparison if timestamps aren't available
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        })
        
        console.log('Final sessions:', sortedSessions)
        setStudySessions(sortedSessions)
      } catch (error) {
        console.error('Error fetching study sessions:', error)
        
        // If the query fails, try a simpler approach
        try {
          console.log('Trying alternative query...')
          const allDocsQuery = collection(db, 'studySessions')
          const allDocsSnapshot = await getDocs(allDocsQuery)
          
          const userSessions: StudySession[] = []
          allDocsSnapshot.forEach((doc) => {
            const data = doc.data()
            if (data.userId === user.uid) {
              userSessions.push({
                id: doc.id,
                subject: data.subject,
                finalDurationMinutes: data.finalDurationMinutes,
                createdDate: data.createdDate,
                createdAt: data.createdAt,
                mode: data.mode
              })
            }
          })
          
          console.log('Alternative query sessions:', userSessions)
          setStudySessions(userSessions)
        } catch (fallbackError) {
          console.error('Fallback query also failed:', fallbackError)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchStudySessions()
  }, [user])

  // Pagination logic
  const totalPages = Math.ceil(studySessions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentSessions = studySessions.slice(startIndex, startIndex + itemsPerPage)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={LockedInLogo} alt="Lock" style={{ width: "200px" }} />
        <div>
          {user ? (
            <>
              <button style={styles.btn4} onClick={back}>Back</button>
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
        <img src={StudyLogIMG} alt="StudyLogLogo" style={{ width: "200px" }} />  
        <img src={PadLock} alt="PadLock" style={{ width: "300px", borderRadius: '200px'}} />
        <div style={styles.btnPos}><button onClick={newStudy} style={styles.btn2}>New Study</button></div>
        
        <div style={styles.studyListContainer}>
          <h3 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Previous Studies</h3>
          
          {loading ? (
            <div style={styles.loadingState}>
              Loading study sessions...
            </div>
          ) : studySessions.length === 0 ? (
            <div style={styles.emptyState}>
              📚 No study sessions found<br/>
              Start your first study session!
            </div>
          ) : (
            <>
              {currentSessions.map((session) => (
                <div 
                  key={session.id}
                  style={{
                    ...styles.studyBubble,
                    ...(hoveredBubble === session.id ? styles.studyBubbleHover : {})
                  }}
                  onMouseEnter={() => setHoveredBubble(session.id)}
                  onMouseLeave={() => setHoveredBubble(null)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>
                        📖 {session.subject}
                      </div>
                      <div style={{ fontSize: '14px', opacity: 0.9 }}>
                        Duration: {formatDuration(session.finalDurationMinutes)}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '14px', opacity: 0.9 }}>
                      {formatDate(session.createdDate)}
                    </div>
                  </div>
                </div>
              ))}
              
              {totalPages > 1 && (
                <div style={styles.paginationContainer}>
                  <button 
                    style={currentPage === 1 ? styles.paginationBtnDisabled : styles.paginationBtn}
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </button>
                  
                  <span style={styles.pageInfo}>
                    {currentPage} of {totalPages}
                  </span>
                  
                  <button 
                    style={currentPage === totalPages ? styles.paginationBtnDisabled : styles.paginationBtn}
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudyLog

