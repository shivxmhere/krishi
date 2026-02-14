export const lightTheme = {
    colors: {
        primary: '#2E7D32', // Agricultural green
        primaryDark: '#1B5E20',
        primaryLight: '#4CAF50',

        secondary: '#FF9800', // Warning/alert orange
        secondaryDark: '#F57C00',
        secondaryLight: '#FFB74D',

        accent: '#00BCD4', // Info blue

        background: '#FFFFFF',
        surface: '#F5F5F5',
        card: '#FFFFFF',

        text: '#212121',
        textSecondary: '#757575',
        textDisabled: '#BDBDBD',

        error: '#D32F2F',
        warning: '#FF9800',
        success: '#4CAF50',
        info: '#2196F3',

        border: '#E0E0E0',
        divider: '#EEEEEE',

        severity: {
            low: '#4CAF50',
            medium: '#FF9800',
            high: '#D32F2F'
        }
    },

    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 40
    },

    typography: {
        h1: {
            fontSize: 32,
            fontWeight: '700',
            fontFamily: 'Poppins-Bold',
            lineHeight: 40
        },
        h2: {
            fontSize: 24,
            fontWeight: '600',
            fontFamily: 'Poppins-SemiBold',
            lineHeight: 32
        },
        body: {
            fontSize: 16,
            fontWeight: '400',
            fontFamily: 'Poppins-Regular',
            lineHeight: 24
        },
        caption: {
            fontSize: 12,
            fontWeight: '400',
            fontFamily: 'Poppins-Regular',
            lineHeight: 16
        }
    },

    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        full: 9999
    },

    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 4
        }
    }
};

export const darkTheme = {
    ...lightTheme,
    colors: {
        ...lightTheme.colors,
        background: '#121212',
        surface: '#1E1E1E',
        card: '#2C2C2C',
        text: '#FFFFFF',
        textSecondary: '#B0B0B0',
        border: '#424242'
    }
};
