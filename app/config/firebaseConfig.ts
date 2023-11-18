import Constants from 'expo-constants';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
    initializeAuth,
    getReactNativePersistence,
    getAuth,
    Auth
} from 'firebase/auth';
import { Database, getDatabase } from 'firebase/database';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const appConstants = Constants?.manifest?.extra;
if (!appConstants) {
    throw new Error('Can`t initialize Firebase');
}

const { FIREBASE } = appConstants;
const firebaseConfig = {
    apiKey: FIREBASE.API_KEY,
    authDomain: FIREBASE.AUTH_DOMAIN,
    projectId: FIREBASE.PROJECT_ID,
    storageBucket: FIREBASE.STORAGE_BUCKET,
    messagingSenderId: FIREBASE.MESSAGING_SENDER_ID,
    appId: FIREBASE.APP_ID,
    databaseURL: FIREBASE.DATABASE_URL
};

let app: FirebaseApp, auth: Auth, db: Database;
export const initFirebase = () => {
    if (!getApps().length) {
        try {
            app = initializeApp(firebaseConfig);
            auth = initializeAuth(app, {
                persistence: getReactNativePersistence(ReactNativeAsyncStorage)
            });
            db = getDatabase(app);
        } catch (error) {
            console.error('Error initializing app: ' + error);
        }
    } else {
        app = getApp();
        auth = getAuth(app);
        db = getDatabase(app);
    }
};

export { app, auth, db };
