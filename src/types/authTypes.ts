export interface AuthConfig {
  signInRoute: string,
  signUpRoute: string,
  signOutRoute: string,
  forgotPasswordRoute: string,
};

export interface User {
  email: string | null,
  isVerified: boolean,
};
