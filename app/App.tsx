import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { initFirebase } from './config/firebaseConfig';

const App = () => {
    useEffect(() => {
        initFirebase();
    }, []);

    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
            <Toast />
        </Provider>
    );
};

export default App;
