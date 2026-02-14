import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import { lightTheme } from '../../theme';
import { useAuthStore } from '../../store/authStore';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const user = useAuthStore(state => state.user);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Namaste,</Text>
                        <Text style={styles.userName}>{user?.full_name || 'Farmer'}</Text>
                    </View>
                    <Ionicons name="notifications-outline" size={24} color={lightTheme.colors.text} />
                </View>

                {/* Weather Card */}
                <Card style={styles.weatherCard}>
                    <View style={styles.weatherHeader}>
                        <View>
                            <Text style={styles.weatherTitle}>New Delhi, India</Text>
                            <Text style={styles.weatherSubtitle}>Partly Cloudy</Text>
                        </View>
                        <Text style={styles.temperature}>28°C</Text>
                    </View>
                    <View style={styles.weatherDetails}>
                        <Text style={styles.weatherDetailText}>Humidity: 65%</Text>
                        <Text style={styles.weatherDetailText}>Wind: 12 km/h</Text>
                    </View>
                </Card>

                {/* Quick Actions */}
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.actionsGrid}>
                    <ActionCard icon="leaf" label="Crops" color="#4CAF50" />
                    <ActionCard icon="scan-circle" label="Scan" color="#FF9800" />
                    <ActionCard icon="water" label="Irrigation" color="#2196F3" />
                    <ActionCard icon="cart" label="Market" color="#9C27B0" />
                </View>

                {/* Recent Activity */}
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <Card style={styles.activityCard} padding="none">
                    <ActivityItem
                        icon="scan"
                        title="Disease Check"
                        subtitle="Tomato • Healthy"
                        time="2h ago"
                    />
                    <ActivityItem
                        icon="calendar"
                        title="Fertilizer Due"
                        subtitle="Wheat • Urea"
                        time="Today"
                    />
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

const ActionCard = ({ icon, label, color }: { icon: any, label: string, color: string }) => (
    <View style={styles.actionItem}>
        <View style={[styles.actionIcon, { backgroundColor: `${color}20` }]}>
            <Ionicons name={icon} size={24} color={color} />
        </View>
        <Text style={styles.actionLabel}>{label}</Text>
    </View>
);

const ActivityItem = ({ icon, title, subtitle, time }: any) => (
    <View style={styles.activityItem}>
        <View style={styles.activityIcon}>
            <Ionicons name={icon} size={20} color={lightTheme.colors.primary} />
        </View>
        <View style={styles.activityInfo}>
            <Text style={styles.activityTitle}>{title}</Text>
            <Text style={styles.activitySubtitle}>{subtitle}</Text>
        </View>
        <Text style={styles.activityTime}>{time}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightTheme.colors.background,
    },
    content: {
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    greeting: {
        ...lightTheme.typography.body,
        color: lightTheme.colors.textSecondary,
    },
    userName: {
        ...lightTheme.typography.h2,
        color: lightTheme.colors.text,
    },
    weatherCard: {
        backgroundColor: lightTheme.colors.primary,
        marginBottom: 24,
    },
    weatherHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    weatherTitle: {
        ...lightTheme.typography.h2,
        color: '#FFF',
        fontSize: 20,
    },
    weatherSubtitle: {
        ...lightTheme.typography.body,
        color: '#FFFFFFCC',
    },
    temperature: {
        ...lightTheme.typography.h1,
        color: '#FFF',
    },
    weatherDetails: {
        flexDirection: 'row',
        gap: 16,
    },
    weatherDetailText: {
        ...lightTheme.typography.caption,
        color: '#FFFFFFCC',
    },
    sectionTitle: {
        ...lightTheme.typography.h2,
        fontSize: 18,
        marginBottom: 16,
        color: lightTheme.colors.text,
    },
    actionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    actionItem: {
        alignItems: 'center',
        width: '22%',
    },
    actionIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    actionLabel: {
        ...lightTheme.typography.caption,
        textAlign: 'center',
        color: lightTheme.colors.text,
    },
    activityCard: {
        backgroundColor: lightTheme.colors.surface,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: lightTheme.colors.divider,
    },
    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: lightTheme.colors.card,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    activityInfo: {
        flex: 1,
    },
    activityTitle: {
        ...lightTheme.typography.body,
        fontFamily: 'Poppins-SemiBold',
    },
    activitySubtitle: {
        ...lightTheme.typography.caption,
        color: lightTheme.colors.textSecondary,
    },
    activityTime: {
        ...lightTheme.typography.caption,
        color: lightTheme.colors.textDisabled,
    },
});
