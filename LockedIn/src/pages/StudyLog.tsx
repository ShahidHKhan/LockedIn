import React, { useEffect, useState } from 'react';
import { getStudySessions } from '../services/studyService';
import StudyEntry from '../components/StudyEntry';

const StudyLog: React.FC = () => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            const data = await getStudySessions();
            setSessions(data);
        };

        fetchSessions();
    }, []);

    return (
        <div>
            <h1>Study Log</h1>
            <ul>
                {sessions.map((session) => (
                    <StudyEntry key={session.id} session={session} />
                ))}
            </ul>
        </div>
    );
};

export default StudyLog;