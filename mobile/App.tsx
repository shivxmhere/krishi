import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.content}>
                    <Text style={styles.text}>Krishi App Initialized</Text>
                </View>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        color: '#2E7D32',
    },
});
