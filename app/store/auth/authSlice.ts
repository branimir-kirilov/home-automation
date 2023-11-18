import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Status } from '../../types/types';
import { signInAsync, signOutAsync } from './authThunks';
import { User } from 'firebase/auth';

interface AuthState {
    user: Partial<User> | null;
    status: Status;
    error: string | undefined;
}

const initialState: AuthState = {
    user: null,
    status: Status.IDLE,
    error: undefined
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Partial<User> | null>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.status = Status.IDLE;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInAsync.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(signInAsync.fulfilled, (state, action) => {
                state.status = Status.IDLE;
                state.user = {
                    uid: action.payload.uid,
                    email: action.payload.email
                };
            })
            .addCase(signInAsync.rejected, (state, action) => {
                state.status = Status.FAILED;
                state.error = action.error.message;
            })
            .addCase(signOutAsync.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(signOutAsync.fulfilled, (state) => {
                state.status = Status.IDLE;
                state.user = null;
            })
            .addCase(signOutAsync.rejected, (state, action) => {
                state.status = Status.FAILED;
                state.error = action.error.message;
            });
    }
});

export const { clearUser } = authSlice.actions;

export const selectUser = (state: RootState) => state?.auth?.user;

export default authSlice.reducer;
