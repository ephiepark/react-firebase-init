// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import AppHeader from "./components/AppHeader";
import SignIn from "./features/signIn/SignIn";
import SignUp from "./components/SignUp";
import ResetPassword from "./components/ResetPassword";
import firebaseConfig from "./firebase/firebaseConfig";
import { init as authInit, genSendEmailVerificationToCurrentUser } from "./firebase/firebaseAuthApis";
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/user/userSlice';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const authConfig = authInit();

function App() {
  const user = useAppSelector(selectUser);
  const text = user === null ? 'Logged out' : 'Logged in as ' + user.email;
  const isVerified = user?.isVerified;
  const resendEmailVerificationButton = (user !== null && !isVerified) ?
    <Button onClick={genSendEmailVerificationToCurrentUser}>Re-send verification email</Button> : null;
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
        <Route path="/">
          <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h1" component="div" gutterBottom>
              {text}
            </Typography>
            {resendEmailVerificationButton}
          </Box>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
