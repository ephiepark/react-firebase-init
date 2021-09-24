import { setUser } from '../features/user/userSlice';
import { store } from '../app/store';
import { AuthConfig, User } from "./types";
import {
  Auth,
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
  signOut,
  onAuthStateChanged,
  UserCredential
} from "firebase/auth";

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
    return setPersistence(auth, browserLocalPersistence).then(() => {
      return createUserWithEmailAndPassword(auth, email, password);
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
