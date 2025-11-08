import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1 className="logo">LockedIn</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="home-main">
        <div className="welcome-section">
          <h2 className="welcome-title">Welcome to LockedIn! 🎉</h2>
          <p className="welcome-text">
            {currentUser?.displayName ? `Hello, ${currentUser.displayName}! ` : ''}
            You've successfully logged in. This is your home page where you can manage your activities.
          </p>
        </div>

        <div className="cards-grid">
          <div className="feature-card">
            <div className="card-icon">📊</div>
            <h3>Dashboard</h3>
            <p>View your analytics and statistics</p>
          </div>

          <div className="feature-card">
            <div className="card-icon">✅</div>
            <h3>Tasks</h3>
            <p>Manage your daily tasks and goals</p>
          </div>

          <div className="feature-card">
            <div className="card-icon">👥</div>
            <h3>Community</h3>
            <p>Connect with other users</p>
          </div>

          <div className="feature-card">
            <div className="card-icon">⚙️</div>
            <h3>Settings</h3>
            <p>Customize your experience</p>
          </div>
        </div>
      </main>

      <footer className="home-footer">
        <p>&copy; 2025 LockedIn. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
