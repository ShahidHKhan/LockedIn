import React from 'react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
    const history = useHistory();

    const handleStudyClick = () => {
        history.push('/timer');
    };

    const handleStudyLogClick = () => {
        history.push('/study-log');
    };

    return (
        <div className="home">
            <h1>Pomodoro Studying App</h1>
            <button onClick={handleStudyClick}>Study</button>
            <button onClick={handleStudyLogClick}>Study Log</button>
        </div>
    );
};

export default Home;