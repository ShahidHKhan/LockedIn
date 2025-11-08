import React from 'react';

const StudyEntry: React.FC<{ session: any }> = ({ session }) => {
  return (
    <li style={{ marginBottom: '0.5rem' }}>
      <strong>{session.subject || 'Unknown'}</strong> — {session.duration || '0:00'} on {session.date || 'unknown'}
    </li>
  );
};

export default StudyEntry;
