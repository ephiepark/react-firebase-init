// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import AppHeader from "./components/AppHeader";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebase/firebaseConfig";
import { init as authInit } from "./firebase/firebaseAuthApis";
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/user/userSlice';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
  const text = user === null ? 'Logged out' : 'Logged in as ' + user.email;
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
          <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h1" component="div" gutterBottom>
              {text}
            </Typography>
          </Box>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
