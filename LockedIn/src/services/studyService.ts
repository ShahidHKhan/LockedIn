import { db } from '../firebase/config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const studySessionsCollection = collection(db, 'studySessions');

export const saveStudySession = async (sessionData) => {
    try {
        const docRef = await addDoc(studySessionsCollection, sessionData);
        return docRef.id;
    } catch (error) {
        console.error('Error saving study session:', error);
        throw new Error('Could not save study session');
    }
};

export const getStudySessions = async () => {
    try {
        const querySnapshot = await getDocs(studySessionsCollection);
        const sessions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return sessions;
    } catch (error) {
        console.error('Error retrieving study sessions:', error);
        throw new Error('Could not retrieve study sessions');
    }
};