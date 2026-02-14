import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
    ScanResult: { scanId: string };
    CropDetail: { cropId: string };
    Chat: undefined;
};

export type AuthStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Crops: undefined;
    Scan: undefined;
    Market: undefined;
    Profile: undefined;
};
