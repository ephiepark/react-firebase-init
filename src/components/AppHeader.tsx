import { AuthConfig } from "../types/authTypes";
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/user/userSlice';
import { genSignOut } from '../firebase/firebaseAuthApis';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { Link as RouterLink } from 'react-router-dom';

function LoggedInNav(props: { authConfig: AuthConfig }) {
  return (
    <nav>
      <Link
        variant="button"
        color="text.primary"
        sx={{ my: 1, mx: 1.5 }}
        component={RouterLink}
        to={"/"}
        onClick={genSignOut}
      >
        Sign Out
      </Link>
    </nav>
  );
}

function LoggedOutNav(props: { authConfig: AuthConfig }) {
  return (
    <nav>
      <Link
        variant="button"
        color="text.primary"
        sx={{ my: 1, mx: 1.5 }}
        component={RouterLink}
        to={"/" + props.authConfig.signInRoute}
      >
        Sign In
      </Link>
      <Link
        variant="button"
        color="text.primary"
        sx={{ my: 1, mx: 1.5 }}
        component={RouterLink}
        to={"/" + props.authConfig.signUpRoute}
      >
        Sign Up
      </Link>
    </nav>
  );
}

export default function AppHeader(props: { authConfig: AuthConfig }) {
  const user = useAppSelector(selectUser);
  let nav = <LoggedInNav authConfig={props.authConfig} />;
  if (user === null) {
    nav = <LoggedOutNav authConfig={props.authConfig} />;
  }
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <Link component={RouterLink} to="/">Company name</Link>
        </Typography>
        {nav}
      </Toolbar>
    </AppBar>
  );
};
