import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../../components/common/Button';
import { useAuthStore } from '../../store/authStore';

export default function ProfileScreen() {
    const logout = useAuthStore(state => state.logout);
    const user = useAuthStore(state => state.user);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.email}>{user?.email}</Text>

            <Button
                title="Logout"
                onPress={logout}
                variant="outline"
                style={styles.button}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
    },
    button: {
        width: '100%',
    },
});
