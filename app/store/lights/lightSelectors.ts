import { lightSelectors } from "./lightsSlice";

export const {
    selectAll: selectAllLights,
    selectById: selectLightById,
    selectEntities: selectLightEntities,
} = lightSelectors;