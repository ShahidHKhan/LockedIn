import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import { AuthProvider, useAuth } from './context/AuthContext';

const RootRoutes: React.FC = () => {
  const { user, loading } = useAuth();
  if (loading) return null; // or a loader

  // If not logged in, default root to register as requested
  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/register" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RootRoutes />
    </AuthProvider>
  );
};

export default App;