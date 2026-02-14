import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AdvisoryScreen() {
    return (
        <View style={styles.container}>
            <Text>Advisory Chat</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
