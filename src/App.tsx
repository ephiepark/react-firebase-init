// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { getSignInWithEmailAndPasswordHandler, getSignUpWithEmailAndPasswordHandler } from "./auth/utils";
import { getAuth } from "firebase/auth";

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


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

function App() {
  return (
    <div className="App">
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Company name
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Features
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Enterprise
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Support
            </Link>
          </nav>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <SignIn handleSignInWithEmailAndPassword={getSignInWithEmailAndPasswordHandler(auth)} />
      <SignUp handleSignUpWithEmailAndPassword={getSignUpWithEmailAndPasswordHandler(auth)}/>
    </div>
  );
}

export default App;
