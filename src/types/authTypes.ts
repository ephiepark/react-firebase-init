export interface AuthConfig {
  signInRoute: string,
  signUpRoute: string,
  signOutRoute: string,
  resetPasswordRoute: string,
};

export interface User {
  email: string | null,
  isVerified: boolean,
};
