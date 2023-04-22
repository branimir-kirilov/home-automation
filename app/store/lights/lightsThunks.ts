import { createAsyncThunk } from "@reduxjs/toolkit";
import LightService from "../../services/LightService";
import { LightSource } from "../../types/types";
import { RootState } from "../store";

export const fetchLightsData = createAsyncThunk(
    'lights/fetchLightsData',
    async () => {
        const response = await LightService.fetchLightsData();

        return response.data;
    }
);

export const updateLight = createAsyncThunk<
    void,
    { id: string, changes: Partial<LightSource> },
    { rejectValue: string }
>('lights/updateLight', async ({ id, changes }, { getState, rejectWithValue }) => {
    try {
        const state = getState() as RootState;
        const light = state.lights.entities[id];
        if (!light) {
          throw new Error(`Light with id ${id} not found`);
        }

        await LightService.changeLight({ ...light, ...changes });
    } catch (error) {
        return rejectWithValue('Error updating light');
    }
});
