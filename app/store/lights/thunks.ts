import { createAsyncThunk } from "@reduxjs/toolkit";
import LightService from "../../services/LightService";

export const fetchLightsData = createAsyncThunk(
    'lights/fetchLightsData',
    async () => {
        const response = await LightService.fetchLightsData();

        return response.data;
    }
);
