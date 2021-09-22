import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, browserLocalPersistence, setPersistence, signOut } from "firebase/auth";

export const getSignInWithEmailAndPasswordHandler = (auth: Auth): (email: string, password: string) => void => {
  return (email: string, password: string): void => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
        });
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  };
};

export const getSignUpWithEmailAndPasswordHandler = (auth: Auth): (email: string, password: string) => void => {
  return (email: string, password: string): void => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log('aasd');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(error);
        });
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  };
};

export const getSignOutHandler = (auth: Auth): () => void => {
  return (): void => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('signout');
    }).catch((error) => {
      // An error happened.
      console.log('signout error');
    });
  };
};
