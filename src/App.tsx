// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import AppHeader from "./components/AppHeader";
import SignIn from "./features/signIn/SignIn";
import SignUp from "./features/signUp/SignUp";
import ResetPassword from "./features/resetPassword/ResetPassword";
import firebaseConfig from "./firebase/firebaseConfig";
import { init as authInit } from "./firebase/firebaseAuthApis";
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/user/userSlice';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import React from "react";
import EmailVerification from "./features/emailVerification/EmailVerification";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const authConfig = authInit();

function App() {
  const user = useAppSelector(selectUser);
  const text = user === null ? 'Logged out' : 'Logged in as ' + user.email;
  const isVerified = user?.isVerified;
  const isVerificationNecessary = (user !== null && !isVerified);
  return (
    <Router>
      <AppHeader authConfig={authConfig} />
      <Switch>
        <Route path={'/' + authConfig.signInRoute}>
          <SignIn authConfig={authConfig} />
        </Route>
        <Route path={'/' + authConfig.signUpRoute}>
          <SignUp authConfig={authConfig} />
        </Route>
        <Route path={'/' + authConfig.resetPasswordRoute}>
          <ResetPassword authConfig={authConfig} />
        </Route>
        <Route path={'/' + authConfig.emailVerificationRoute}>
          <EmailVerification />
        </Route>
        <Route path="/">
          {isVerificationNecessary ? <Redirect to={'/' + authConfig.emailVerificationRoute} /> : text}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
