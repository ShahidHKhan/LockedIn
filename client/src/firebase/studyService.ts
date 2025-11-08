import { collection, addDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore'
import { db } from './config'
import { auth } from './config'

export type StudySession = {
  userId?: string
  subject: string
  mode: 'minutes' | 'continuous'
  durationMinutes: number // target duration in minutes (0 for continuous)
  breakIntervalSeconds?: number
  breakDurationSeconds?: number
  startedAt?: any
  endedAt?: any
  finalDurationMinutes?: number
  createdAt?: any
}

const coll = collection(db, 'studySessions')

export async function createStudySession(session: StudySession) {
  const payload: any = {
    ...session,
    createdAt: serverTimestamp(),
    startedAt: serverTimestamp(),
    createdDate: new Date().toLocaleDateString('en-US'),
  }
  if (auth.currentUser) payload.userId = auth.currentUser.uid
  const docRef = await addDoc(coll, payload)
  return docRef.id
}

export async function endStudySession(sessionId: string, finalDurationMinutes: number) {
  const ref = doc(db, 'studySessions', sessionId)
  await updateDoc(ref, {
    finalDurationMinutes,
    endedAt: serverTimestamp(),
  })
}

export async function getSession(sessionId: string) {
  const ref = doc(db, 'studySessions', sessionId)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}
