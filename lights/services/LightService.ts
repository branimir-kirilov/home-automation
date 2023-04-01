type ChangeLightResponse = {};

// TODO: Modify api to include name
// TODO: Add endpoint to control switch on/off

// TODO: call real API
export default class LightService {
    static changeRGB(
        name: string,
        color: string
    ): Promise<void | ChangeLightResponse> {
        const path = `some/url${name}`;
        // return fetch(path)
        //     .then((response) => {
        //         console.log('response', response);
        //     })
        //     .catch((error) => {
        //         console.log('error', error);
        //     });
    }

    static turnOff(name: string): Promise<void | ChangeLightResponse> {
        // const path = `some/url${name}`;
        // return fetch(path)
        //     .then((response) => {})
        //     .catch(() => {});
    }
}
