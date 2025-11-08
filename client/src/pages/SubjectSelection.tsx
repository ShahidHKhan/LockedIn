import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Subject = {
  id: string
  name: string
  color: string
  quote: string
}

const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Mathematics', color: '#f97316', quote: 'Pure mathematics is, in its way, the poetry of logical ideas. — Albert Einstein' },
  { id: 'physics', name: 'Physics', color: '#06b6d4', quote: 'Nature is written in mathematical language. — Galileo Galilei' },
  { id: 'chemistry', name: 'Chemistry', color: '#ef4444', quote: 'Chemistry is the study of matter. — Unknown' },
  { id: 'history', name: 'History', color: '#8b5cf6', quote: 'Study the past if you would define the future. — Confucius' },
  { id: 'language', name: 'Language', color: '#10b981', quote: 'Language is the road map of a culture. — Rita Mae Brown' },
]

const SubjectSelection: React.FC = () => {
  const [selected, setSelected] = useState<Subject | null>(null)
  const navigate = useNavigate()

  const handleConfirm = () => {
    if (!selected) return
    // store selection in localStorage so next pages can access it
    localStorage.setItem('lockedin:subject', JSON.stringify(selected))
    navigate('/timer')
  }

  return (
    <div style={{ padding: 32, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <button onClick={() => navigate('/home')} style={{ marginBottom: 12 }}>Back</button>

      <h2>Select a subject</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12, marginTop: 16 }}>
        {SUBJECTS.map((s) => (
          <div key={s.id}
            onClick={() => setSelected(s)}
            style={{
              borderRadius: 10,
              padding: 16,
              cursor: 'pointer',
              background: selected?.id === s.id ? '#f8fafc' : '#fff',
              boxShadow: selected?.id === s.id ? `0 6px 18px ${s.color}22` : '0 4px 12px rgba(0,0,0,0.04)',
              border: `2px solid ${selected?.id === s.id ? s.color : 'transparent'}`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, background: s.color }} />
              <div style={{ fontWeight: 700 }}>{s.name}</div>
            </div>
            {selected?.id === s.id && (
              <div style={{ marginTop: 10, color: '#475569' }}>
                <div style={{ fontStyle: 'italic', marginBottom: 8 }}>{s.quote}</div>
                <button onClick={handleConfirm} style={{ marginTop: 6 }}>Confirm</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubjectSelection
