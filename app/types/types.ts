export interface Hub {
    name: string;
    path: string;
}

export interface LightSource {
    id: string;
    name: string;
    path: string;
    color: string;
    brightness: number;
    enabled: boolean;
    status: Status;
    error?: string;
    notImplemented?: boolean;
}

export type RGBColor = {
    r: number;
    g: number;
    b: number;
};

export enum Status {
    IDLE = 'idle',
    LOADING = 'loading',
    FAILED = 'failed',
}