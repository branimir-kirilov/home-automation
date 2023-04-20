import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LightSource, Status } from '../../types/types';
import { fetchLightsData, updateLight } from './lightsThunks';

interface LightsState extends EntityState<LightSource> {
    status: Status;
    error: string | null;
}

const lightsAdapter = createEntityAdapter<LightSource>({
    selectId: (lightSource) => lightSource.id,
    // temporarily sort desc by notImplemented field
    sortComparer: (a, b) => Number(b.notImplemented) - Number(a.notImplemented)
});

export const lightsSlice = createSlice({
    name: 'lightsSlice',
    initialState: lightsAdapter.getInitialState<LightsState>({
        ids: [],
        entities: {},
        status: Status.IDLE,
        error: null,
    }),
    reducers: {
        lightUpdated: lightsAdapter.updateOne,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLightsData.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(fetchLightsData.fulfilled, (state, action) => {
                state.status = Status.IDLE;
                lightsAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchLightsData.rejected, (state) => {
                state.status = Status.FAILED;
            })
            .addCase(updateLight.pending, (state, action) => {
                lightsAdapter.updateOne(state, { id: action.meta.arg.id, changes: { status: Status.LOADING } })
            })
            .addCase(updateLight.fulfilled, (state, action) => {
                lightsAdapter.updateOne(state, { id: action.meta.arg.id, changes: { status: Status.IDLE, ...action.meta.arg.changes } })
            })
            .addCase(updateLight.rejected, (state, action) => {
                lightsAdapter.updateOne(state, { id: action.meta.arg.id, changes: { status: Status.FAILED } })
            });
    },
});

export const { lightUpdated } = lightsSlice.actions;

export const lightSelectors = lightsAdapter.getSelectors<RootState>(
    (state) => state.lights
)

export default lightsSlice.reducer;
