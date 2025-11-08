export interface User {
    id: string;
    email: string;
    displayName?: string;
}

export interface StudySession {
    id: string;
    userId: string;
    startTime: Date;
    endTime: Date;
    duration: number; // in minutes
    notes?: string;
}