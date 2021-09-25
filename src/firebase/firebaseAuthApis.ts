import { setUser } from '../features/user/userSlice';
import { store } from '../app/store';
import { AuthConfig, User } from "../types/authTypes";
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  getAuth,
  sendPasswordResetEmail
} from "firebase/auth";

export const genSendEmailVerificationToCurrentUser = async (): Promise<void> => {
  const currentUser = getAuth().currentUser;
  if (currentUser !== null) {
    await sendEmailVerification(currentUser);
  } else {
    throw new Error('Missing current user');
  }
};

export const genSendPasswordResetEmail = async (email: string): Promise<void> => {
  return await sendPasswordResetEmail(getAuth(), email);
};

export const genSignInWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  const auth = getAuth();
  return setPersistence(auth, browserLocalPersistence).then(async () => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return getUserFromFirebaseUserNonnull(userCredential.user);
  });
};

export const genSignUpWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  const auth = getAuth();
  return setPersistence(auth, browserLocalPersistence).then(async () => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await genSendEmailVerificationToCurrentUser();
    return getUserFromFirebaseUserNonnull(userCredential.user);
  });
};

export const genSignOut = (): Promise<void> => {
  const auth = getAuth();
  return signOut(auth);
};

export const getUserFromFirebaseUserNonnull = (user: FirebaseUser): User => {
  return {
    email: user.email,
    isVerified: user.emailVerified,
  };
};

export const getUserFromFirebaseUser = (user: FirebaseUser | null): User | null => {
  if (user === null) {
    return null;
  }
  return getUserFromFirebaseUserNonnull(user);
};

export const init = (): AuthConfig => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    store.dispatch(setUser(getUserFromFirebaseUser(user)));
  });

  return {
    signInRoute: 'signin',
    signUpRoute: 'signup',
    signOutRoute: 'signout',
    resetPasswordRoute: 'resetpassword',
    emailVerificationRoute: 'emailverification',
  };
};
