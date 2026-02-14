import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { lightTheme } from '../../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
}

export const Button = ({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    style,
    textStyle,
    icon
}: ButtonProps) => {
    const getBackgroundColor = () => {
        if (disabled) return lightTheme.colors.textDisabled;
        switch (variant) {
            case 'primary': return lightTheme.colors.primary;
            case 'secondary': return lightTheme.colors.secondary;
            case 'outline': return 'transparent';
            case 'ghost': return 'transparent';
            default: return lightTheme.colors.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return '#FFFFFF';
        switch (variant) {
            case 'primary': return '#FFFFFF';
            case 'secondary': return '#FFFFFF';
            case 'outline': return lightTheme.colors.primary;
            case 'ghost': return lightTheme.colors.primary;
            default: return '#FFFFFF';
        }
    };

    const getHeight = () => {
        switch (size) {
            case 'sm': return 32;
            case 'md': return 48;
            case 'lg': return 56;
            default: return 48;
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.container,
                {
                    backgroundColor: getBackgroundColor(),
                    height: getHeight(),
                    borderColor: variant === 'outline' ? lightTheme.colors.primary : 'transparent',
                    borderWidth: variant === 'outline' ? 1 : 0,
                },
                style
            ]}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <>
                    {icon}
                    <Text style={[
                        styles.text,
                        {
                            color: getTextColor(),
                            fontSize: size === 'sm' ? 12 : 16,
                            marginLeft: icon ? 8 : 0
                        },
                        textStyle
                    ]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16,
    },
    text: {
        fontFamily: 'Poppins-SemiBold',
    },
});
