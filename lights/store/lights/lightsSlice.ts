import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LightSourceData, Status } from '../../types/types';
import { changeLight, fetchLightsData } from './thunks';


export interface LightsSlice {
    lightSources: {
        items: LightSourceData[],
        status: Status;
    },
    changeLight: {
        status: Status;
        error: string | undefined;
    }
}

const initialState: LightsSlice = {
    lightSources: {
        items: [],
        status: 'idle',
    },
    changeLight: {
        status: 'idle',
        error: undefined,
    }
};

export const lightsSlice = createSlice({
    name: 'lightsSlice',
    initialState,
    reducers: {
        updateItems: (state, action: PayloadAction<LightSourceData[]>) => {
            state.lightSources.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLightsData.pending, (state) => {
                state.lightSources.status = 'loading';
            })
            .addCase(fetchLightsData.fulfilled, (state, action) => {
                state.lightSources.status = 'idle';
                state.lightSources.items = action.payload;
            })
            .addCase(fetchLightsData.rejected, (state) => {
                state.lightSources.status = 'failed';
            })
            .addCase(changeLight.pending, (state) => {
                state.changeLight.status = 'loading';
            })
            .addCase(changeLight.fulfilled, (state, action) => {
                state.changeLight.status = 'idle';
                state.lightSources.items = action.payload.items;
            })
            .addCase(changeLight.rejected, (state, action) => {
                state.changeLight.status = 'failed';
                state.changeLight.error = action.error.message;
            });
    },
});

export const { updateItems } = lightsSlice.actions;

export const selectLightSources = (state: RootState) => state.lights.lightSources;
export const selectChangeLight = (state: RootState) => state.lights.changeLight;

export default lightsSlice.reducer;
