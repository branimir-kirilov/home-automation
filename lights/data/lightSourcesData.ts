import { LightSourceData } from '../types/types';

export const lightsListData: LightSourceData[] = [
    {
        name: 'Desk',
        path: '/desk',
        color: '#ffff00',
        brightness: 100,
        enabled: true,
        status: 'idle'
    },
    {
        name: 'Ceiling',
        path: '/ceiling',
        color: '#00ff00',
        brightness: 0,
        status: 'idle',
        enabled: false
    },
    {
        name: 'Kitchen',
        path: '/ceiling',
        color: '#00ff00',
        brightness: 0,
        enabled: false,
        status: 'idle',
        notImplemented: true
    },
    {
        name: 'Bedroom',
        path: '/ceiling',
        color: '#00ff00',
        brightness: 0,
        enabled: false,
        status: 'idle',
        notImplemented: true
    },
    {
        name: 'Living room',
        path: '/ceiling',
        color: '#00ff00',
        brightness: 0,
        enabled: false,
        status: 'idle',
        notImplemented: true
    },
    {
        name: 'Floor',
        path: '/ceiling',
        color: '#00ff00',
        brightness: 0,
        enabled: false,
        status: 'idle',
        notImplemented: true
    }
];
