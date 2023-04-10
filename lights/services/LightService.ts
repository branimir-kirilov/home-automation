import { hexToRgb } from '../utils/colors';
import Constants from 'expo-constants';

type LightServiceResponse = {};

const WEMOS_URL = Constants?.expoConfig?.extra?.WEMOS_HOST;

export default class LightService {
    // POST @ {host}/{name}/rgb
    static changeRGB(
        path: string,
        hex: string,
        brightness = 100
    ): Promise<void | LightServiceResponse> {
        const url = `${WEMOS_URL}${path}/rgb`;

        const req: RequestInit = {
            method: 'POST',
            body: JSON.stringify({
                ...hexToRgb(hex),
                brightness: brightness / 100
            })
        };

        return fetch(url, req)
            .then((response) => {
                if (response.status != 200) {
                    console.log('LightService error here', response);
                    return;
                }
                console.log('LightService success!', response.status);
            })
            .catch((error) => {
                console.log('LightService error', error);
            });
    }

    // TODO
    // GET @ {host}/{name}/state/{state}
    static setState(
        name: string,
        state: boolean
    ): Promise<void | LightServiceResponse> {
        throw new Error('Not implemented yet');
    }
}
