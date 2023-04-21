import { Hub } from '../types/types';

export const homeControlData: Hub[] = [
    {
        name: 'Lights',
        component: 'LightsList'
    },
    {
        name: 'Heating',
        component: 'HeatingList'
    },
    {
        name: 'Blinds',
        component: 'BlindsList'
    },
    {
        name: 'Plants',
        component: 'PlantsList'
    }
];
