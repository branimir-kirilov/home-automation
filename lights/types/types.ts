export interface HomeListData {
    name: string;
    path: string;
}

export interface LightSourceData {
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

// TODO: Enum
export type Status = 'idle' | 'loading' | 'failed';