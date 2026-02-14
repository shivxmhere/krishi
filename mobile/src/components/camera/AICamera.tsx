import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { lightTheme } from '../../theme';
import * as Haptics from 'expo-haptics';

export const AICamera = () => {
    const [type, setType] = useState(CameraType.back);
    const [flash, setFlash] = useState(FlashMode.off);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef<Camera>(null);
    const navigation = useNavigation<any>();

    useEffect(() => {
        (async () => {
            if (!permission?.granted) {
                await requestPermission();
            }
        })();
    }, []);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No access to camera</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.button}>
                    <Text style={styles.text}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            const photo = await cameraRef.current.takePictureAsync();
            navigation.navigate('ScanResult', { uri: photo.uri });
        }
    };

    const toggleFlash = () => {
        setFlash(current =>
            current === FlashMode.off ? FlashMode.on : FlashMode.off
        );
    };

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={type}
                flashMode={flash}
                ref={cameraRef}
            >
                <View style={styles.overlay}>
                    {/* Header Controls */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                            <Ionicons name="close" size={28} color="#FFF" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleFlash} style={styles.iconButton}>
                            <Ionicons
                                name={flash === FlashMode.on ? "flash" : "flash-off"}
                                size={28}
                                color="#FFF"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Focus Frame */}
                    <View style={styles.focusFrame}>
                        <View style={[styles.corner, styles.topLeft]} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />
                        <Text style={styles.instruction}>Align leaf within frame</Text>
                    </View>

                    {/* Bottom Controls */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.galleryButton}>
                            <Ionicons name="images" size={24} color="#FFF" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                            <View style={styles.captureInner} />
                        </TouchableOpacity>

                        <View style={{ width: 40 }} />
                    </View>
                </View>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        flex: 1,
    },
    text: {
        color: '#FFF',
        textAlign: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: lightTheme.colors.primary,
        marginTop: 20,
        borderRadius: 5,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconButton: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
    },
    focusFrame: {
        width: 280,
        height: 280,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    corner: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderColor: '#FFF',
        borderWidth: 2,
    },
    topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
    topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
    bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
    bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
    instruction: {
        color: '#FFF',
        fontFamily: 'Poppins-Medium',
        marginTop: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'absolute',
        bottom: -40,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 30,
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    captureInner: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FFF',
    },
    galleryButton: {
        padding: 10,
    },
});
