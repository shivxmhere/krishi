import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing
} from 'react-native-reanimated';
import { lightTheme } from '../../theme';

export const ScanAnimation = ({ isScanning }: { isScanning: boolean }) => {
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);

    useEffect(() => {
        if (isScanning) {
            rotation.value = withRepeat(
                withTiming(360, { duration: 2000, easing: Easing.linear }),
                -1,
                false
            );
            scale.value = withRepeat(
                withTiming(1.1, { duration: 1000 }),
                -1,
                true
            );
        } else {
            rotation.value = 0;
            scale.value = 1;
        }
    }, [isScanning]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { rotate: `${rotation.value}deg` },
            { scale: scale.value }
        ]
    }));

    if (!isScanning) return null;

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.scanner, animatedStyle]}>
                <View style={styles.core} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 10,
    },
    scanner: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: lightTheme.colors.primary,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    core: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: `${lightTheme.colors.primary}40`,
    }
});
