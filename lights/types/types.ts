export interface HomeListData {
    name: string;
    path: string;
}

export interface LightListData {
    name: string;
    path: string;
    color: string;
    brightness: number;
    disabled?: boolean;
}

export type RGBColor = {
    r: number;
    g: number;
    b: number;
};
