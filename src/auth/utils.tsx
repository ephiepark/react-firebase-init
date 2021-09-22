import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const getSignInWithEmailAndPasswordHandler = (auth: Auth): (email: string, password: string) => void => {
  return (email: string, password: string): void => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log('hi');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };
};

export const getSignUpWithEmailAndPasswordHandler = (auth: Auth): (email: string, password: string) => void => {
  return (email: string, password: string): void => {
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
  };
};
