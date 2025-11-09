import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FrameImg from '../assets/SubjectFrame.png'

type ChosenSubject = {
  categoryId: string
  categoryName: string
  subjectName: string
}

type GeneralCategory = {
  id: string
  name: string
  subjects: string[]
}

const CATEGORIES: GeneralCategory[] = [
  {
    id: 'mathematics',
    name: 'Mathematics & Related Fields',
    subjects: [
      'Algebra',
      'Geometry',
      'Trigonometry',
      'Calculus',
      'Statistics',
      'Probability',
      'Discrete Mathematics',
      'Linear Algebra',
      'Differential Equations',
      'Mathematical Logic',
      'Number Theory',
    ],
  },
  {
    id: 'science',
    name: 'Science',
    subjects: [
      'Physics',
      'Chemistry',
      'Biology',
      'Earth Science',
      'Environmental Science',
      'Astronomy',
      'Geology',
      'Marine Science',
      'Anatomy & Physiology',
      'Biochemistry',
      'Microbiology',
      'Genetics',
      'Ecology',
    ],
  },
  {
    id: 'tech',
    name: 'Technology & Computer Science',
    subjects: [
      'Computer Science',
      'Programming / Coding',
      'Data Structures & Algorithms',
      'Software Engineering',
      'Artificial Intelligence',
      'Machine Learning',
      'Cybersecurity',
      'Computer Networks',
      'Web Development',
      'Game Development',
      'Robotics',
      'Information Technology (IT)',
      'Computer Graphics',
      'Operating Systems',
      'Databases',
      'Cloud Computing',
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering',
    subjects: [
      'Mechanical Engineering',
      'Electrical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Computer Engineering',
      'Aerospace Engineering',
      'Industrial Engineering',
      'Biomedical Engineering',
      'Environmental Engineering',
      'Mechatronics',
      'Materials Science',
      'Systems Engineering',
    ],
  },
  {
    id: 'humanities',
    name: 'Humanities & Social Sciences',
    subjects: [
      'English Language',
      'English Literature',
      'Creative Writing',
      'Linguistics',
      'Comparative Literature',
      'Journalism',
      'Speech & Communication',
      'Media Studies',
      'History',
      'Geography',
      'Political Science',
      'Sociology',
      'Psychology',
      'Anthropology',
      'Archaeology',
      'Economics',
      'International Relations',
      'Gender Studies',
      'Cultural Studies',
      'Criminology',
      'Law / Legal Studies',
      'Philosophy',
      'Ethics',
    ],
  },
  {
    id: 'arts',
    name: 'Arts & Design',
    subjects: [
      'Visual Arts',
      'Fine Arts',
      'Graphic Design',
      'Photography',
      'Film Studies',
      'Theater / Drama',
      'Music Theory',
      'Music Performance',
      'Dance',
      'Architecture',
      'Interior Design',
      'Fashion Design',
      'Animation',
      'Digital Media',
      'Art History',
    ],
  },
  {
    id: 'business',
    name: 'Business & Economics',
    subjects: [
      'Business Administration',
      'Management',
      'Accounting',
      'Finance',
      'Marketing',
      'Entrepreneurship',
      'Economics',
      'International Business',
      'Human Resource Management',
      'Supply Chain Management',
      'Business Law',
      'E-Commerce',
    ],
  },
  {
    id: 'health',
    name: 'Health & Medicine',
    subjects: [
      'Medicine',
      'Nursing',
      'Public Health',
      'Pharmacology',
      'Dentistry',
      'Physical Therapy',
      'Occupational Therapy',
      'Nutrition',
      'Health Science',
      'Veterinary Medicine',
      'Medical Technology',
      'Sports Medicine',
    ],
  },
  {
    id: 'applied',
    name: 'Applied & Environmental Fields',
    subjects: [
      'Agriculture',
      'Forestry',
      'Environmental Studies',
      'Urban Planning',
      'Sustainability Studies',
      'Wildlife Management',
      'Oceanography',
      'Geographical Information Systems (GIS)',
    ],
  },
  {
    id: 'education',
    name: 'Education & Professional Fields',
    subjects: [
      'Education / Teaching',
      'Early Childhood Education',
      'Special Education',
      'Curriculum Design',
      'Educational Psychology',
      'Library & Information Science',
      'Counseling',
      'Social Work',
    ],
  },
  {
    id: 'other',
    name: 'Other / Interdisciplinary Fields',
    subjects: [
      'Cognitive Science',
      'Neuroscience',
      'Data Science',
      'Artificial Intelligence Ethics',
      'Game Design',
      'Digital Humanities',
      'Communication Studies',
      'Peace & Conflict Studies',
      'Religious Studies',
      'Theology',
      'Hospitality & Tourism',
      'Culinary Arts',
      'Aviation',
      'Sports Science',
      'Military Science',
    ],
  },
]

function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

const SubjectSelection: React.FC = () => {
  const navigate = useNavigate()
  const [catIndex, setCatIndex] = useState(0) // center index for categories
  const [expandedCategory, setExpandedCategory] = useState<GeneralCategory | null>(null)
  const [shake, setShake] = useState(false)

  

  // trigger shake animation briefly whenever the category index changes
  useEffect(() => {
    setShake(true)
    const t = setTimeout(() => setShake(false), 420)
    return () => clearTimeout(t)
  }, [catIndex])

  const centerCat = CATEGORIES[mod(catIndex, CATEGORIES.length)]

  // state for two-stage flow
  const [categoryConfirmed, setCategoryConfirmed] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const confirmCategory = () => {
    setCategoryConfirmed(true)
    setExpandedCategory(centerCat)
    setSelectedSubject(null)
  }

  const confirmSubject = () => {
    if (!selectedSubject || !expandedCategory) return
    const chosen: ChosenSubject = {
      categoryId: expandedCategory.id,
      categoryName: expandedCategory.name,
      subjectName: selectedSubject,
    }
  localStorage.setItem('lockedin:subject', JSON.stringify(chosen))
  // route in App.tsx uses /timerSelection
  navigate('/timerSelection')
  }

  // small style helpers
  const containerStyle: React.CSSProperties = { padding: 28, fontFamily: 'Inter, system-ui, sans-serif' }

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate('/home')} style={{ padding: '8px 12px', background: '#C9A178', color: '#fff', border: 'none', borderRadius: 8 }}>Back</button>
        <h2 style={{ margin: 0 }}>Choose a subject</h2>
        <div style={{ width: 80 }} />
      </div>

      <p style={{ color: '#64748b', marginTop: 12 }}>Pick a general area, then choose a specific subject within that area.</p>

  {/* inject small CSS for shake animation */}
  <style>{`@keyframes shake {0% { transform: translateX(0); } 20% { transform: translateX(-8px) rotate(-1deg); } 40% { transform: translateX(6px) rotate(1deg); } 60% { transform: translateX(-4px) rotate(-0.5deg); } 80% { transform: translateX(2px) rotate(0.5deg); } 100% { transform: translateX(0); }} .subject-frame.shake { animation: shake 420ms cubic-bezier(.36,.07,.19,.97); } .subject-frame.shifted { transform: translateX(-18%) scale(0.86); transition: transform 420ms cubic-bezier(.2,.8,.2,1); }`}</style>

      {/* General category carousel (three visible) */}
      {/* If category not confirmed show single framed card with arrows and confirm button. If confirmed hide the frame and buttons and show subject list only. */}
      {!categoryConfirmed && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 28 }}>
            <button aria-label="prev-category" onClick={() => setCatIndex((i) => i - 1)} style={{ padding: 12, marginRight: 12, background: '#C9A178', color: '#fff', border: 'none', borderRadius: 8 }}>◀</button>

            <div style={{ position: 'relative', width: 'min(72vw, 520px)', height: 'min(72vw, 520px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={FrameImg}
                alt="subject frame"
                className={`subject-frame ${shake ? 'shake' : ''}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />

              {/* overlayed center text */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none', padding: '12px 18px' }}>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{centerCat.name}</div>
                <div style={{ marginTop: 8, color: '#64748b', fontSize: 13 }}>{centerCat.subjects.length} topics</div>
              </div>
            </div>

            <button aria-label="next-category" onClick={() => setCatIndex((i) => i + 1)} style={{ padding: 12, marginLeft: 12, background: '#C9A178', color: '#fff', border: 'none', borderRadius: 8 }}>▶</button>
          </div>

          <div style={{ height: 8 }} />

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
            <button onClick={confirmCategory} style={{ padding: '10px 18px', background: '#C9A178', color: '#fff', border: 'none', borderRadius: 8 }}>Confirm Category</button>
          </div>
        </>
      )}

      {/* Subjects list shown when categoryConfirmed is true */}
      {categoryConfirmed && expandedCategory ? (
        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 'min(92vw, 920px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 800 }}>{expandedCategory.name}</div>
              <div />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
              {expandedCategory.subjects.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSubject(s)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: selectedSubject === s ? '2px solid #C9A178' : '1px solid #e6e6e6',
                    background: selectedSubject === s ? '#F8F1E9' : '#fff',
                    cursor: 'pointer',
                    textAlign: 'center',
                    whiteSpace: 'normal'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 18 }}>
              <button onClick={() => { setCategoryConfirmed(false); setExpandedCategory(null); }} style={{ padding: '8px 12px', background: '#F3E9DE', color: '#6b4b2a', border: '1px solid #e6d6c4', borderRadius: 8 }}>Change Category</button>
              <button onClick={confirmSubject} style={{ padding: '10px 18px', background: selectedSubject ? '#C9A178' : '#e9dccf', color: selectedSubject ? '#fff' : '#987a5c', border: 'none', borderRadius: 8 }} disabled={!selectedSubject}>Confirm Subject</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default SubjectSelection
