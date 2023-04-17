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
            // TODO: refactor and use adapter
            .addCase(changeLight.pending, (state, action) => {
                state.changeLight.status = 'loading';
                const res = state.lightSources.items.find(lightSource => lightSource.name === action.meta.arg.name);
                if (res) {
                    res.status = 'loading';
                }
            })
            .addCase(changeLight.fulfilled, (state, action) => {
                state.changeLight.status = 'idle';
                state.lightSources.items = action.payload.items;
                const res = state.lightSources.items.find(lightSource => lightSource.name === action.meta.arg.name);
                if (res) {
                    res.status = 'idle';
                }
            })
            .addCase(changeLight.rejected, (state, action) => {
                state.changeLight.status = 'failed';
                const res = state.lightSources.items.find(lightSource => lightSource.name === action.meta.arg.name);
                if (res) {
                    res.status = 'failed';
                    res.error = action.error.message;
                }
                state.changeLight.error = action.error.message;
            })
    },
});

export const { updateItems } = lightsSlice.actions;

export const selectLightSources = (state: RootState) => state.lights.lightSources;
export const selectLightSourceByName = (name: string) => (state: RootState) => state.lights.lightSources.items.find(item => item.name === name);


export default lightsSlice.reducer;
