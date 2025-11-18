'use client';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

// Helper function to create user document in Firestore
async function createUserDocument(user: any, additionalData: any = {}) {
  if (!user) return;
  const firestore = getFirestore(user.app);
  const userRef = doc(firestore, `users/${user.uid}`);
  const { displayName, email, photoURL } = user;
  const userData = {
    id: user.uid,
    displayName: displayName || `${additionalData.firstName || ''} ${additionalData.lastName || ''}`.trim(),
    email,
    photoURL,
    firstName: additionalData.firstName || '',
    lastName: additionalData.lastName || '',
    signUpDate: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };

  // Use setDoc with merge to avoid overwriting existing data if any
  await setDoc(userRef, userData, { merge: true });
}

// Sign up with email and password
export async function signUpWithEmail(auth: Auth, email: string, password: string, additionalData: { firstName: string, lastName: string }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const { user } = userCredential;
  await updateProfile(user, {
    displayName: `${additionalData.firstName} ${additionalData.lastName}`.trim(),
  });
  await createUserDocument(user, additionalData);
  return userCredential;
}

// Sign in with email and password
export async function signInWithEmail(auth: Auth, email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userRef = doc(getFirestore(auth.app), `users/${userCredential.user.uid}`);
  await setDoc(userRef, { lastLogin: new Date().toISOString() }, { merge: true });
  return userCredential;
}

// Sign in with Google
export async function signInWithGoogle(auth: Auth) {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  const nameParts = user.displayName?.split(' ') || [];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  await createUserDocument(user, { firstName, lastName });
  return userCredential;
}

// Sign in with Facebook
export async function signInWithFacebook(auth: Auth) {
  const provider = new FacebookAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  const nameParts = user.displayName?.split(' ') || [];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  await createUserDocument(user, { firstName, lastName });
  return userCredential;
}


// Sign out
export async function signOut(auth: Auth) {
  return await firebaseSignOut(auth);
}
