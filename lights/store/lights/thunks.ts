import { createAsyncThunk } from "@reduxjs/toolkit";
import LightService from "../../services/LightService";
import { LightSourceData } from "../../types/types";
import { RootState } from "../store";

export const fetchLightsData = createAsyncThunk(
    'lights/fetchLightsData',
    async () => {
        const response = await LightService.fetchLightsData();

        return response.data;
    }
);

export const changeLight = createAsyncThunk(
    'lights/controlLight',
    async (data: LightSourceData, { getState }) => {
        const { lightSources } = (getState() as RootState).lights;

        const response = await LightService.changeLight(data);

        const updatedItems = lightSources.items.map((item) => {
            if (item.name === data.name) {
                return {
                    ...item,
                    brightness: data.brightness,
                    color: data.color,
                    enabled: data.enabled,
                };
            }

            return item;
        });

        return { items: updatedItems, response: response.body };
    }
);