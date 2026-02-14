import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuthStore } from '../../store/authStore';
import { auth } from '../../api/endpoints';
import { lightTheme } from '../../theme';

export default function LoginScreen() {
    const navigation = useNavigation<any>();
    const login = useAuthStore(state => state.login);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Direct integration with backend
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);

            const response = await auth.login(formData);

            // Get profile
            // const profile = await auth.getProfile();

            login(response.data.access_token, { email }); // Mock user for now
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.detail || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to continue to Krishi</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <Button
                        title="Login"
                        onPress={handleLogin}
                        loading={loading}
                        style={styles.button}
                    />

                    <Button
                        title="Create Account"
                        variant="ghost"
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightTheme.colors.background,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 48,
    },
    title: {
        ...lightTheme.typography.h1,
        color: lightTheme.colors.primary,
        marginBottom: 8,
    },
    subtitle: {
        ...lightTheme.typography.body,
        color: lightTheme.colors.textSecondary,
    },
    form: {
        gap: 16,
    },
    button: {
        marginTop: 16,
    },
    errorText: {
        color: lightTheme.colors.error,
        textAlign: 'center',
        marginBottom: 8,
    },
});
