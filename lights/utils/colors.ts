import { RGBColor } from '../types/types';

export const hexToRgb = (hex: string): RGBColor => {
    hex = hex.replace('#', '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
};

export const Colors = {
    WHITE: 'white',
    BLACK: 'black',
    GRAY: '#999',
    GRAY_LIGHT: '#ccc',
    BLACKISH: '#1d1d1d',
    BASE_BACKGROUND: 'rgb(40,41,46)',
}
