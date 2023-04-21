import { hexToRgb } from '../utils/colors';
import Constants from 'expo-constants';
import { lightsListData } from '../data/lightSourcesData';
import { LightSource } from '../types/types';

const WEMOS_URL = Constants?.expoConfig?.extra?.WEMOS_HOST;

export default class LightService {
    // A mock function to mimic making an async GET request for light sources data
    static fetchLightsData() {
        return new Promise<{ data: LightSource[] }>((resolve) =>
            setTimeout(() => resolve({ data: lightsListData }), 0)
        );
    }

    // POST @ {host}/{lights}/{lightId}
    static changeLight(data: LightSource): Promise<Response> {
        const url = `${WEMOS_URL}/lights/${data.id}`;

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
