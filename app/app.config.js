export default {
    expo: {
        name: 'home',
        slug: 'home',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/icon.png',
        userInterfaceStyle: 'dark',
        splash: {
            image: './assets/icon.png',
            resizeMode: 'contain',
            backgroundColor: '#263543'
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/icon.png',
                backgroundColor: '#263543'
            }
        },
        web: {
            favicon: './assets/favicon.png'
        },
        extra: {
            WEMOS_HOST: process.env.WEMOS_HOST,
            FIREBASE: {
                API_KEY: process.env.FIREBASE_API_KEY,
                AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
                DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
                PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
                STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
                MESSAGING_SENDER_ID: process.env.FIREBASE_SENDER_ID,
                APP_ID: process.env.FIREBASE_APP_ID,
                MEASUREMENT_ID: process.env.FIREBASE_MEASURING_ID
            }
        }
    }
};
