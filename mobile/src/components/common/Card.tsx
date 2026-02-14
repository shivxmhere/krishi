import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { lightTheme } from '../../theme';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    variant?: 'elevated' | 'outlined' | 'flat';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({
    children,
    style,
    variant = 'elevated',
    padding = 'md'
}: CardProps) => {
    const getPadding = () => {
        switch (padding) {
            case 'none': return 0;
            case 'sm': return 8;
            case 'md': return 16;
            case 'lg': return 24;
            default: return 16;
        }
    };

    return (
        <View style={[
            styles.container,
            variant === 'elevated' && styles.elevated,
            variant === 'outlined' && styles.outlined,
            { padding: getPadding() },
            style
        ]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: lightTheme.colors.card,
        borderRadius: 16,
    },
    elevated: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    outlined: {
        borderWidth: 1,
        borderColor: lightTheme.colors.border,
    },
});
