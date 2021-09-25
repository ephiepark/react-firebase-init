import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { genSignInWithEmailAndPassword } from '../../firebase/firebaseAuthApis';

import { User } from '../../types/authTypes';

export interface SignInState {
  error: {errorCode: string, errorMessage: string} | null;
  status: 'idle' | 'processing' | 'failed';
}

const initialState: SignInState = {
  error: null,
  status: 'idle',
};

export const signInAsync = createAsyncThunk(
  'signIn/signInRequest',
  async (emailAndPassword: {email: string, password: string}): Promise<User> => {
    const response = await genSignInWithEmailAndPassword(
      emailAndPassword.email,
      emailAndPassword.password
    );
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.status = 'processing';
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = null;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = {
          errorCode: action.error.code ?? '',
          errorMessage: action.error.message ?? '',
        };
      });
  },
});

// export const { } = signInSlice.actions;

export const selectSignInError = (state: RootState) => state.signIn.error;

export default signInSlice.reducer;
