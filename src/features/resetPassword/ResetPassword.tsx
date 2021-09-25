import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../user/userSlice';
import { AuthConfig } from "../../types/authTypes";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Redirect } from "react-router-dom";
import { selectResetPasswordError, selectResetPasswordStatus, sendPasswordResetEmailAsync } from './resetPasswordSlice';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function ResetPassword(props: { authConfig: AuthConfig }) {
  const dispatch = useDispatch();
  const error = useAppSelector(selectResetPasswordError);
  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectResetPasswordStatus);
  if (user !== null) {
    return <Redirect to="/" />;
  }

  const alertConfig = {
    isSuccess: status === 'success',
    alertMessage: status === 'success' ? 'Password reset email sent!' : error?.errorMessage ?? '',
  };
  const alert = (status === 'success' || status === 'failed') ? <Alert severity={alertConfig.isSuccess ? 'success' : 'error'}>{alertConfig.alertMessage}</Alert> : null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString() || '';
    dispatch(sendPasswordResetEmailAsync(email));
  };

  const buttonConfig = {
    disabled: status === 'processing',
    content: status === 'processing' ? <div>{'Sending reset password email'}<CircularProgress size={10}/></div> : 'Send reset password email',
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          {alert}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={buttonConfig.disabled}
            >
              {buttonConfig.content}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
