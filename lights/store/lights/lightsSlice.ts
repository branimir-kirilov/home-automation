import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LightSourceData, Status } from '../../types/types';
import { fetchLightsData } from './thunks';
import LightService from '../../services/LightService';

interface LightsState extends EntityState<LightSourceData> {
    status: Status;
    error: string | null;
}

const lightsAdapter = createEntityAdapter<LightSourceData>({
    selectId: (lightSource) => lightSource.id,
    // temporarily sort desc by notImplemented field
    sortComparer: (a, b) => Number(b.notImplemented) - Number(a.notImplemented)
})

export const updateLight = createAsyncThunk<
    void,
    { id: string, changes: Partial<LightSourceData> },
    { rejectValue: string }
>('lights/updateLight', async ({ id, changes }, { dispatch, getState }) => {
    try {
        const light = selectLightById(getState() as RootState, id);
        if (!light) {
          throw new Error(`Light with id ${id} not found`);
        }
        dispatch(lightUpdated({ id: light.id, changes: { status: 'loading' } }));

        await LightService.changeLight({ ...light, ...changes });

        dispatch(lightUpdated({ id, changes: { ...changes, status: 'idle' } }));
    } catch (error) {
        dispatch(lightUpdated({ id, changes: { ...changes, status: 'failed' } }));
    }
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
            });
    },
});

export const { lightUpdated } = lightsSlice.actions;

const lightSelectors = lightsAdapter.getSelectors<RootState>(
    (state) => state.lights
)


export const {
    selectAll: selectAllLights,
    selectById: selectLightById,
    selectEntities: selectLightEntities,
} = lightSelectors;

export default lightsSlice.reducer;
