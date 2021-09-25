import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import signInReducer from '../features/signIn/signInSlice';
import signUpReducer from '../features/signUp/signUpSlice';
import resetPasswordReducer from '../features/resetPassword/resetPasswordSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    signIn: signInReducer,
    signUp: signUpReducer,
    resetPassword: resetPasswordReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
