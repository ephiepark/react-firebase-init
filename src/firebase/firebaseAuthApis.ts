import { setUser } from '../features/user/userSlice';
import { store } from '../app/store';
import { AuthConfig, User } from "../types/authTypes";
import {
  Auth,
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
  signOut,
  onAuthStateChanged,
  UserCredential,
  sendEmailVerification,
  getAuth
} from "firebase/auth";

export const genSendEmailVerificationToCurrentUser = async () => {
  const currentUser = getAuth()?.currentUser;
  if (currentUser !== null) {
    await sendEmailVerification(currentUser);
  } else {
    throw new Error('Missing current user');
  }
};

export const getSignInWithEmailAndPasswordHandler = (auth: Auth): (email: string, password: string) => void => {
  // TODO error handling
  return (email: string, password: string): Promise<UserCredential> => {
    return setPersistence(auth, browserLocalPersistence).then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    });
  };
};

export const getSignUpWithEmailAndPasswordHandler = (auth: Auth): (email: string, password: string) => void => {
  // TODO error handling
  return (email: string, password: string): Promise<UserCredential> => {
    return setPersistence(auth, browserLocalPersistence).then(async () => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await genSendEmailVerificationToCurrentUser();
      return userCredential;
    });
  };
};

export const getSignOutHandler = (auth: Auth): () => void => {
  // TODO error handling
  return (): Promise<void> => {
    return signOut(auth);
  };
};

export const getUserFromFirebaseUser = (user: FirebaseUser | null): User | null => {
  if (user === null) {
    return null;
  }
  return {
    email: user.email,
    isVerified: user.emailVerified,
  };
};

export const init = (auth: Auth): AuthConfig => {
  onAuthStateChanged(auth, (user) => {
    store.dispatch(setUser(getUserFromFirebaseUser(user)));
  });

  return {
    signInRoute: 'signin',
    signInWithEmailAndPasswordHandler: getSignInWithEmailAndPasswordHandler(auth),
    signUpRoute: 'signup',
    signUpWithEmailAndPasswordHandler: getSignUpWithEmailAndPasswordHandler(auth),
    signOutRoute: 'signout',
    signOutHandler: getSignOutHandler(auth),
  };
};
