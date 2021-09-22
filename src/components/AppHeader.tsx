import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { AuthConfig } from "../types";

export default function AppHeader(props: { authConfig: AuthConfig }) {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <Link href="/">Company name</Link>
        </Typography>
        <nav>
          <Link
            variant="button"
            color="text.primary"
            href={"/" + props.authConfig.signInRoute}
            sx={{ my: 1, mx: 1.5 }}
          >
            Sign In
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href={"/" + props.authConfig.signUpRoute}
            sx={{ my: 1, mx: 1.5 }}
          >
            Sign Up
          </Link>
        </nav>
        <Button onClick={props.authConfig.signOutHandler}>Sign Out</Button>
      </Toolbar>
    </AppBar>
  );
};
