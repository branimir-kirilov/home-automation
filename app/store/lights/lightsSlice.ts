import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LightSourceData, Status } from '../../types/types';
import { fetchLightsData, updateLight } from './lightsThunks';

interface LightsState extends EntityState<LightSourceData> {
    status: Status;
    error: string | null;
}

const lightsAdapter = createEntityAdapter<LightSourceData>({
    selectId: (lightSource) => lightSource.id,
    // temporarily sort desc by notImplemented field
    sortComparer: (a, b) => Number(b.notImplemented) - Number(a.notImplemented)
});

export const lightsSlice = createSlice({
    name: 'lightsSlice',
    initialState: lightsAdapter.getInitialState<LightsState>({
        ids: [],
        entities: {},
        status: 'idle',
        error: null,
    }),
    reducers: {
        lightUpdated: lightsAdapter.updateOne,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLightsData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLightsData.fulfilled, (state, action) => {
                state.status = 'idle';
                lightsAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchLightsData.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(updateLight.pending, (state, action) => {
                lightsAdapter.updateOne(state, { id: action.meta.arg.id, changes: { status: 'loading' } })
            })
            .addCase(updateLight.fulfilled, (state, action) => {
                lightsAdapter.updateOne(state, { id: action.meta.arg.id, changes: { status: 'idle', ...action.meta.arg.changes } })
            })
            .addCase(updateLight.rejected, (state, action) => {
                lightsAdapter.updateOne(state, { id: action.meta.arg.id, changes: { status: 'failed' } })
            });
    },
});

export const { lightUpdated } = lightsSlice.actions;

export const lightSelectors = lightsAdapter.getSelectors<RootState>(
    (state) => state.lights
)

export default lightsSlice.reducer;
