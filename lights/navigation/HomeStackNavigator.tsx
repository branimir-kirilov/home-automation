import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeList from '../screens/HomeList';
import LightsList from '../screens/lights/LightsList';
import LightDetails from '../screens/lights/LightSourceDetails';

export type HomeStackParamList = {
    HomeList: undefined;
    LightsList: undefined;
    LightDetails: { id: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const ListStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeList"
                component={HomeList}
                options={{
                    title: 'Smart devices',
                    ...listStyles
                }}
            />
            <Stack.Screen
                name="LightsList"
                component={LightsList}
                options={{
                    title: 'Lights',
                    headerTintColor: '#eee',
                    ...listStyles
                }}
            />
            <Stack.Screen
                name="LightDetails"
                component={LightDetails}
                options={{
                    title: 'Light options',
                    headerTintColor: '#eee',
                    ...listStyles
                }}
            />
        </Stack.Navigator>
    );
};

const listStyles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#1d1d1d'
    },
    headerTitleStyle: {
        color: '#eee',
        fontFamily: 'sans-serif-thin'
    },
    headerBackTitleStyle: {
        fontSize: 35,
        color: '#eee',
        fontFamily: 'sans-serif-thin'
    }
});

export default ListStackNavigator;
