import { StyleSheet, } from 'react-native';
import LightsList from './screens/LightsList';
import Home from './screens/HomeList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// TODO: extract stack auth to another file
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'My Home',
            ...listStyles
          }}
        />
        <Stack.Screen
          name="Lights"
          component={LightsList}
          options={{
            title: 'My Home',
            headerTintColor: '#eee',
            ...listStyles
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const listStyles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#1d1d1d',
  },
  headerTitleStyle: {
    color: '#eee',
    fontFamily: 'sans-serif-thin',
  },
  headerBackTitleStyle: {
    fontSize: 35,
    color: '#eee',
    fontFamily: 'sans-serif-thin',
  }
});