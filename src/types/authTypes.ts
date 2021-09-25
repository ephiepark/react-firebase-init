export interface AuthConfig {
  signInRoute: string,
  signUpRoute: string,
  signOutRoute: string,
  resetPasswordRoute: string,
  emailVerificationRoute: string,
};

export interface User {
  email: string | null,
  isVerified: boolean,
};
