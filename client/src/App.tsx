import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import SubjectSelection from './pages/SubjectSelection'
import TimerSelection from './pages/TimerSelection'
import MainTimer from './pages/MainTimer'
import BreakDisplay from './pages/BreakDisplay'
import EndScreen from './pages/EndScreen'
import NotesAIDisplay from './pages/NotesAIDisplay'
import StudyLog from './pages/StudyLog'
import './App.css'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/subjectSelection" element={<SubjectSelection />} />
      <Route path="/timerSelection" element={<TimerSelection />} />
      <Route path="/mainTimer" element={<MainTimer />} />
      <Route path="/breakDisplay" element={<BreakDisplay />} />
      <Route path="/endScreen" element={<EndScreen />} />
      <Route path="/notesAIDisplay" element={<NotesAIDisplay />} />
      <Route path="/studyLog" element={<StudyLog />} />
      {/* fallback to home */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default App
