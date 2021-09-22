// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import AppHeader from "./components/AppHeader";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { getSignInWithEmailAndPasswordHandler, getSignOutHandler, getSignUpWithEmailAndPasswordHandler } from "./auth/utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthConfig } from "./types";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZh7pdOTfwWqrOclagbuLHql1xgxUfdfE",
  authDomain: "fungi-story.firebaseapp.com",
  projectId: "fungi-story",
  storageBucket: "fungi-story.appspot.com",
  messagingSenderId: "104628365708",
  appId: "1:104628365708:web:da80b4af0b2084b4240ea9",
  measurementId: "G-4HQ08B8ZYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
    console.log('login');
  } else {
    // User is signed out
    // ...
    console.log('logout');
  }
});

const authConfig: AuthConfig = {
  signInRoute: 'signin',
  signInWithEmailAndPasswordHandler: getSignInWithEmailAndPasswordHandler(auth),
  signUpRoute: 'signup',
  signUpWithEmailAndPasswordHandler: getSignUpWithEmailAndPasswordHandler(auth),
  signOutRoute: 'signout',
  signOutHandler: getSignOutHandler(auth),
};

function App() {
  console.log(auth.currentUser);
  return (
    <Router>
      <AppHeader authConfig={authConfig} />
      <div className="App">
        <Switch>
          <Route path={'/' + authConfig.signInRoute}>
            <SignIn handleSignInWithEmailAndPassword={authConfig.signInWithEmailAndPasswordHandler} />
          </Route>
          <Route path={'/' + authConfig.signOutRoute}>
            <SignUp handleSignUpWithEmailAndPassword={authConfig.signUpWithEmailAndPasswordHandler} />
          </Route>
          <Route path="/">
            <div>hi {auth.currentUser?.email}</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
