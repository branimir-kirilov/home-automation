import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getAuth,
    UserCredential,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

interface SignInData {
    email: string;
    password: string;
}

export const signInAsync = createAsyncThunk(
    'auth/signIn',
    async (data: SignInData, { dispatch, rejectWithValue }) => {
        try {
            const auth = getAuth();
            const userCredential: UserCredential =
                await signInWithEmailAndPassword(
                    auth,
                    data.email,
                    data.password
                );
            const { uid, email } = userCredential.user;
            return { uid, email };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const signOutAsync = createAsyncThunk(
    'auth/signOut',
    async (_, { rejectWithValue }) => {
        try {
            const auth = getAuth();
            signOut(auth);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
