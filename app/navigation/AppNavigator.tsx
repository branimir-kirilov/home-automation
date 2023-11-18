import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeListStackNavigator from './HomeStackNavigator';
import SettingsScreen from '../screens/Settings';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../utils/colors';
import { useAppSelector } from '../hooks/hooks';
import { selectUser } from '../store/auth/authSlice';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    const user = useAppSelector(selectUser);
    if (!user) {
        return <LoginScreen />;
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: Colors.BASE_BACKGROUND
                },
                tabBarIcon: ({ focused, color, size }) => {
                    return (
                        <Ionicons
                            name={`${
                                route.name === 'Home' ? 'home' : 'settings'
                            }${focused ? '' : '-outline'}`}
                            size={size}
                            color={focused ? '#eee' : color}
                        />
                    );
                },
                tabBarActiveTintColor: '#eee',
                tabBarInactiveTintColor: '#666'
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeListStackNavigator}
                options={{
                    title: 'My Home',
                    ...listStyles
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Settings',
                    ...listStyles
                }}
            />
        </Tab.Navigator>
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

export default AppNavigator;
