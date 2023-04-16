import { hexToRgb } from '../utils/colors';
import Constants from 'expo-constants';
import { lightsListData } from '../data/lightsData';
import { LightSourceData } from '../types/types';

const WEMOS_URL = Constants?.expoConfig?.extra?.WEMOS_HOST;

// TODO investigate:
// https://redux-toolkit.js.org/rtk-query/usage/code-splitting
export default class LightService {
    // A mock function to mimic making an async GET request for light sources data
    static fetchLightsData(amount = 1) {
        return new Promise<{ data: LightSourceData[] }>((resolve) =>
            setTimeout(
                () => resolve({ data: lightsListData.slice(0, amount) }),
                150
            )
        );
    }

    // POST @ {host}/{name}/rgb
    static changeLight(data: LightSourceData): Promise<Response> {
        const url = `${WEMOS_URL}${data.path}/rgb`;

        const req: RequestInit = {
            method: 'POST',
            body: JSON.stringify({
                ...hexToRgb(data.color),
                brightness: data.brightness / 100
            })
        };

        return fetch(url, req);
    }
}
