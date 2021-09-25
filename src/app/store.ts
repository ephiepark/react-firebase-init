import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import signInReducer from '../features/signIn/signInSlice';
import signUpReducer from '../features/signUp/signUpSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    signIn: signInReducer,
    signUp: signUpReducer,
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
