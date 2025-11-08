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
  <Route path="/subject" element={<SubjectSelection />} />
  <Route path="/timer" element={<TimerSelection />} />
  <Route path="/main" element={<MainTimer />} />
  <Route path="/break" element={<BreakDisplay />} />
  <Route path="/end" element={<EndScreen />} />
  <Route path="/notes" element={<NotesAIDisplay />} />
  <Route path="/log" element={<StudyLog />} />
      {/* fallback to home */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default App
