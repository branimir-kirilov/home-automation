import { LightSourceData } from '../types/types';

export const lightsListData: LightSourceData[] = [
    {
        id: 'desk',
        name: 'Desk',
        path: '/desk',
        color: '#ffff00',
        brightness: 100,
        enabled: true,
        status: 'idle'
    },
    {
        id: 'ceiling',
        name: 'Ceiling',
        path: '/ceiling',
        color: '#00ff00',
        brightness: 0,
        status: 'idle',
        enabled: false
    },
    {
        id: 'kitchen',
        name: 'Kitchen',
        path: '/ceiling',
        color: '#00ff00',
        brightness: 0,
        enabled: false,
        status: 'idle',
        notImplemented: true
    },
    {
        id: 'bedroom',
        name: 'Bedroom',
        path: '/ceiling',
        color: '#00ff00',
        brightness: 0,
        enabled: false,
        status: 'idle',
        notImplemented: true
    },
    {
        id: 'living room',
        name: 'Living room',
        path: '/ceiling',
        color: '#00ff00',
        brightness: 0,
        enabled: false,
        status: 'idle',
        notImplemented: true
    },
    {
        id: 'floor',
        name: 'Floor',
        path: '/ceiling',
        color: '#00ff00',
        brightness: 0,
        enabled: false,
        status: 'idle',
        notImplemented: true
    }
];
