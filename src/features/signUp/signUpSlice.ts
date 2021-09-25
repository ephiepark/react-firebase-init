import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { genSignUpWithEmailAndPassword } from '../../firebase/firebaseAuthApis';

import { User } from '../../types/authTypes';

export interface SignUpState {
  error: {errorCode: string, errorMessage: string} | null;
  status: 'idle' | 'processing' | 'failed';
}

const initialState: SignUpState = {
  error: null,
  status: 'idle',
};

export const signUpAsync = createAsyncThunk(
  'signUp/signUpRequest',
  async (emailAndPassword: {email: string, password: string}): Promise<User> => {
    const response = await genSignUpWithEmailAndPassword(
      emailAndPassword.email,
      emailAndPassword.password
    );
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.status = 'processing';
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = null;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = {
          errorCode: action.error.code ?? '',
          errorMessage: action.error.message ?? '',
        };
      });
  },
});

// export const { } = signInSlice.actions;

export const selectSignUpError = (state: RootState) => state.signUp.error;
export const selectSignUpStatus = (state: RootState) => state.signUp.status;

export default signUpSlice.reducer;
