import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { lightTheme } from '../../theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input = ({
    label,
    error,
    leftIcon,
    rightIcon,
    style,
    ...props
}: InputProps) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={[
                styles.inputContainer,
                error ? styles.errorBorder : null
            ]}>
                {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={lightTheme.colors.textDisabled}
                    {...props}
                />

                {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: lightTheme.colors.text,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: lightTheme.colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: lightTheme.colors.border,
        height: 56,
    },
    input: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: lightTheme.colors.text,
        paddingHorizontal: 16,
        height: '100%',
    },
    iconLeft: {
        paddingLeft: 16,
    },
    iconRight: {
        paddingRight: 16,
    },
    errorBorder: {
        borderColor: lightTheme.colors.error,
    },
    errorText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: lightTheme.colors.error,
        marginTop: 4,
    },
});
