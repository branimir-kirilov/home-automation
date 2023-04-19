import secrets from './secrets.ts';

export default {
    expo: {
      name: "home",
      slug: "home",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "dark",
      splash: {
        image: "./assets/icon.png",
        resizeMode: "contain",
        backgroundColor: "#263543"
      },
      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/icon.png",
          backgroundColor: "#263543"
        }
      },
      web: {
        favicon: "./assets/favicon.png"
      },
      extra: {
        WEMOS_HOST: process.env.WEMOS_HOST,
      }
    }
  };
  