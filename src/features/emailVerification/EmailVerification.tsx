import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../user/userSlice';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Redirect } from "react-router-dom";
import { selectEmailVerificationError, selectEmailVerificationStatus, sendEmailVerificationAsync } from './emailVerificationSlice';
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

export default function EmailVerification() {
  const dispatch = useDispatch();
  const error = useAppSelector(selectEmailVerificationError);
  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectEmailVerificationStatus);
  if (user === null || user.isVerified) {
    return <Redirect to="/" />;
  }

  const alertConfig = {
    isSuccess: status === 'success',
    alertMessage: status === 'success' ? 'Email Verification sent!' : error?.errorMessage ?? '',
  };
  const alert = (status === 'success' || status === 'failed') ? <Alert severity={alertConfig.isSuccess ? 'success' : 'error'}>{alertConfig.alertMessage}</Alert> : null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(sendEmailVerificationAsync());
  };

  const buttonConfig = {
    disabled: status === 'processing',
    content: status === 'processing' ? <div>{'Sending email verification'}<CircularProgress size={10}/></div> : 'Send email verification',
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
            Email Verification
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            Your account is not yet verified. Please check your email and verify your account. If you haven't received a verification email, please use the button below to re-send email verification.
          </Typography>
          {alert}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
