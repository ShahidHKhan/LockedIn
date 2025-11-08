import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
      <nav>
        <Link to="/">Home</Link> | <Link to="/timer">Study</Link> | <Link to="/study-log">Study Log</Link>
      </nav>
    </header>
  );
};

export default Header;
