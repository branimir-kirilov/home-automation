export interface HomeListData {
    name: string;
    path: string;
}

export interface LightSourceData {
    name: string;
    path: string;
    color: string;
    brightness: number;
    enabled: boolean;
    notImplemented?: boolean;
}

export type RGBColor = {
    r: number;
    g: number;
    b: number;
};

export type Status = 'idle' | 'loading' | 'failed';
