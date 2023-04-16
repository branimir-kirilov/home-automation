import { combineReducers } from '@reduxjs/toolkit';
import lightsSlice from './lights/lightsSlice';

export const rootReducer = combineReducers({
    lights: lightsSlice
});
