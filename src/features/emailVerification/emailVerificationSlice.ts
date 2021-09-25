import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { genSendEmailVerificationToCurrentUser, genSendPasswordResetEmail } from '../../firebase/firebaseAuthApis';

import { User } from '../../types/authTypes';

export interface EmailVerificationState {
  error: {errorCode: string, errorMessage: string} | null;
  status: 'idle' | 'processing' | 'failed' | 'success';
}

const initialState: EmailVerificationState = {
  error: null,
  status: 'idle',
};

export const sendEmailVerificationAsync = createAsyncThunk(
  'emailVerification/sendEmailVerification',
  async (): Promise<void> => {
    return await genSendEmailVerificationToCurrentUser();
  }
);

export const emailVerificationSlice = createSlice({
  name: 'emailVerification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendEmailVerificationAsync.pending, (state) => {
        state.status = 'processing';
        state.error = null;
      })
      .addCase(sendEmailVerificationAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = null;
      })
      .addCase(sendEmailVerificationAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = {
          errorCode: action.error.code ?? '',
          errorMessage: action.error.message ?? '',
        };
      });
  },
});

// export const { } = signInSlice.actions;

export const selectEmailVerificationError = (state: RootState) => state.emailVerification.error;
export const selectEmailVerificationStatus = (state: RootState) => state.emailVerification.status;

export default emailVerificationSlice.reducer;
