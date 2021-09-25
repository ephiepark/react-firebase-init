import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { genSendPasswordResetEmail } from '../../firebase/firebaseAuthApis';


export interface ResetPasswordState {
  error: {errorCode: string, errorMessage: string} | null;
  status: 'idle' | 'processing' | 'failed' | 'success';
}

const initialState: ResetPasswordState = {
  error: null,
  status: 'idle',
};

export const sendPasswordResetEmailAsync = createAsyncThunk(
  'resetPassword/sendPasswordResetEmail',
  async (email: string): Promise<void> => {
    return await genSendPasswordResetEmail(email);
  }
);

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendPasswordResetEmailAsync.pending, (state) => {
        state.status = 'processing';
        state.error = null;
      })
      .addCase(sendPasswordResetEmailAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = null;
      })
      .addCase(sendPasswordResetEmailAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = {
          errorCode: action.error.code ?? '',
          errorMessage: action.error.message ?? '',
        };
      });
  },
});

// export const { } = signInSlice.actions;

export const selectResetPasswordError = (state: RootState) => state.resetPassword.error;
export const selectResetPasswordStatus = (state: RootState) => state.resetPassword.status;

export default resetPasswordSlice.reducer;
