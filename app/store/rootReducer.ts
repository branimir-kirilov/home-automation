import { combineReducers } from '@reduxjs/toolkit';
import lightsSlice from './lights/lightsSlice';
import authSlice from './auth/authSlice';

export const rootReducer = combineReducers({
    lights: lightsSlice,
    auth: authSlice
});
