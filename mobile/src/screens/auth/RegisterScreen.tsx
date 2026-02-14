import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { auth } from '../../api/endpoints';
import { lightTheme } from '../../theme';

export default function RegisterScreen() {
    const navigation = useNavigation<any>();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async () => {
        if (!fullName || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await auth.register({
                email,
                password,
                full_name: fullName
            });

            // Navigate to login on success
            navigation.navigate('Login');
            alert('Account created! Please login.');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.detail || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Join the Krishi community</Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChangeText={setFullName}
                        />

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
                            title="Sign Up"
                            onPress={handleRegister}
                            loading={loading}
                            style={styles.button}
                        />

                        <Button
                            title="Already have an account? Login"
                            variant="ghost"
                            onPress={() => navigation.navigate('Login')}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightTheme.colors.background,
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
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
