import Constants from 'expo-constants';

export const ENV = {
    API_URL: Constants.expoConfig?.extra?.apiUrl || 'http://localhost:8000',
    IS_DEV: process.env.NODE_ENV === 'development',
};
