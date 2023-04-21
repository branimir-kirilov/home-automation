import { LightSource, Status } from '../types/types';

export const lightsListData: LightSource[] = [
    {
        id: 'desk',
        name: 'Desk',
        color: '#ffff00',
        brightness: 100,
        enabled: true,
        status: Status.IDLE
    },
    {
        id: 'ceiling',
        name: 'Ceiling',
        color: '#00ff00',
        brightness: 0,
        enabled: false,
        status: Status.IDLE,
        notImplemented: true
    },
    {
        id: 'kitchen',
        name: 'Kitchen',
        color: '#00ff00',
        brightness: 0,
        enabled: false,
        status: Status.IDLE,
        notImplemented: true
    },
    {
        id: 'bedroom',
        name: 'Bedroom',
        color: '#00ff00',
        brightness: 0,
        enabled: false,
        status: Status.IDLE,
        notImplemented: true
    },
    {
        id: 'living room',
        name: 'Living room',
        color: '#00ff00',
        brightness: 0,
        enabled: false,
        status: Status.IDLE,
        notImplemented: true
    },
    {
        id: 'floor',
        name: 'Floor',
        color: '#00ff00',
        brightness: 0,
        enabled: false,
        status: Status.IDLE,
        notImplemented: true
    }
];
