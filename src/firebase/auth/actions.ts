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
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';

async function isUserAdmin(user: User): Promise<boolean> {
  if (!user) return false;
  const firestore = getFirestore(user.app);
  const adminRoleRef = doc(firestore, `roles_admin/${user.uid}`);
  const adminDoc = await getDoc(adminRoleRef);
  return adminDoc.exists();
}

async function getRedirectPath(user: User): Promise<string> {
    const isAdmin = await isUserAdmin(user);
    return isAdmin ? '/employer/dashboard' : '/student/dashboard';
}


// Helper function to create user document in Firestore
async function createUserDocument(user: any, additionalData: any = {}) {
  if (!user) return;
  const firestore = getFirestore(user.app);
  const userRef = doc(firestore, `users/${user.uid}`);
  
  // Check if the user document already exists
  const userDoc = await getDoc(userRef);

  const { email, photoURL } = user;
  const displayName = additionalData.firstName && additionalData.lastName ? `${additionalData.firstName} ${additionalData.lastName}`.trim() : user.displayName;

  const userData = {
    id: user.uid,
    firstName: additionalData.firstName || '',
    lastName: additionalData.lastName || '',
    email,
    profilePictureUrl: photoURL,
    purchasedCourseIds: [],
    // Only set signUpDate if the document doesn't exist
    ...(!userDoc.exists() && { signUpDate: new Date().toISOString() })
  };

  // Use setDoc with merge to create or update the user document
  await setDoc(userRef, userData, { merge: true });

  if (displayName && user.displayName !== displayName) {
    await updateProfile(user, { displayName });
  }
}

// Sign up with email and password
export async function signUpWithEmail(auth: Auth, email: string, password: string, additionalData: { firstName: string, lastName: string }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const { user } = userCredential;
  await createUserDocument(user, additionalData);
  const redirectPath = await getRedirectPath(user);
  return { userCredential, redirectPath };
}

// Sign in with email and password
export async function signInWithEmail(auth: Auth, email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userRef = doc(getFirestore(auth.app), `users/${userCredential.user.uid}`);
  await setDoc(userRef, { lastLogin: new Date().toISOString() }, { merge: true });
  const redirectPath = await getRedirectPath(userCredential.user);
  return { userCredential, redirectPath };
}

// Sign in with Google
export async function signInWithGoogle(auth: Auth) {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  const nameParts = user.displayName?.split(' ') || [];
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ');
  await createUserDocument(user, { firstName, lastName });
  const redirectPath = await getRedirectPath(user);
  return { userCredential, redirectPath };
}

// Sign in with Facebook
export async function signInWithFacebook(auth: Auth) {
  const provider = new FacebookAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  const nameParts = user.displayName?.split(' ') || [];
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ');
  await createUserDocument(user, { firstName, lastName });
  const redirectPath = await getRedirectPath(user);
  return { userCredential, redirectPath };
}


// Sign out
export async function signOut(auth: Auth) {
  return await firebaseSignOut(auth);
}
