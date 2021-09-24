// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import AppHeader from "./components/AppHeader";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./configs/firebaseConfig";
import { init as authInit } from "./auth/firebaseAuthApis";
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/user/userSlice';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

const authConfig = authInit(auth);

function App() {
  const user = useAppSelector(selectUser);
  return (
    <Router>
      <AppHeader authConfig={authConfig} />
      <Switch>
        <Route path={'/' + authConfig.signInRoute}>
          <SignIn handleSignInWithEmailAndPassword={authConfig.signInWithEmailAndPasswordHandler} />
        </Route>
        <Route path={'/' + authConfig.signUpRoute}>
          <SignUp handleSignUpWithEmailAndPassword={authConfig.signUpWithEmailAndPasswordHandler} />
        </Route>
        <Route path="/">
          <div>hi {user?.email}</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
