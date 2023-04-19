import { hexToRgb } from '../utils/colors';
import Constants from 'expo-constants';
import { lightsListData } from '../data/lightSourcesData';
import { LightSourceData } from '../types/types';

const WEMOS_URL = Constants?.expoConfig?.extra?.WEMOS_HOST;

export default class LightService {
    // A mock function to mimic making an async GET request for light sources data
    static fetchLightsData() {
        return new Promise<{ data: LightSourceData[] }>((resolve) =>
            setTimeout(() => resolve({ data: lightsListData }), 0)
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
