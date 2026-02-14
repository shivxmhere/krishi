import { useState, useCallback } from 'react';
import { Camera } from 'expo-camera';

export const useCamera = () => {
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const checkPermission = useCallback(async () => {
        if (!permission?.granted) {
            const response = await requestPermission();
            return response.granted;
        }
        return true;
    }, [permission, requestPermission]);

    return { permission, checkPermission };
};
