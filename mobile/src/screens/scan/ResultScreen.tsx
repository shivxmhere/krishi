import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { lightTheme } from '../../theme';
import { ScanAnimation } from '../../components/detection/ScanAnimation';

export default function ResultScreen() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { uri } = route.params;
    const [analyzing, setAnalyzing] = useState(true);

    // Mock analysis result
    const [result, setResult] = useState<any>(null);

    React.useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setResult({
                disease: 'Early Blight',
                confidence: 0.92,
                severity: 'Medium',
                treatment: [
                    'Remove infected leaves immediately.',
                    'Apply copper-based fungicide.',
                    'Ensure proper spacing between plants.'
                ]
            });
            setAnalyzing(false);
        }, 3000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScanAnimation isScanning={analyzing} />

            <ScrollView contentContainerStyle={styles.content}>
                <Image source={{ uri }} style={styles.image} />

                {!analyzing && result && (
                    <View style={styles.resultContainer}>
                        <Card style={styles.resultCard}>
                            <Text style={styles.diseaseName}>{result.disease}</Text>
                            <View style={styles.badgeContainer}>
                                <View style={[styles.badge, styles.confidenceBadge]}>
                                    <Text style={styles.badgeText}>{(result.confidence * 100).toFixed(0)}% Confidence</Text>
                                </View>
                                <View style={[styles.badge, styles.severityBadge]}>
                                    <Text style={styles.badgeText}>{result.severity} Severity</Text>
                                </View>
                            </View>
                        </Card>

                        <Text style={styles.sectionTitle}>Treatment Plan</Text>
                        <Card>
                            {result.treatment.map((step: string, index: number) => (
                                <View key={index} style={styles.step}>
                                    <View style={styles.stepNumber}>
                                        <Text style={styles.stepNumberText}>{index + 1}</Text>
                                    </View>
                                    <Text style={styles.stepText}>{step}</Text>
                                </View>
                            ))}
                        </Card>

                        <Button
                            title="Save to History"
                            onPress={() => navigation.navigate('History')}
                            style={styles.actionButton}
                        />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightTheme.colors.background,
    },
    content: {
        padding: 24,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 16,
        marginBottom: 24,
    },
    resultContainer: {
        gap: 24,
    },
    resultCard: {
        alignItems: 'center',
        padding: 24,
    },
    diseaseName: {
        ...lightTheme.typography.h1,
        color: lightTheme.colors.error,
        marginBottom: 16,
        textAlign: 'center',
    },
    badgeContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    confidenceBadge: {
        backgroundColor: lightTheme.colors.primary,
    },
    severityBadge: {
        backgroundColor: lightTheme.colors.secondary,
    },
    badgeText: {
        color: '#FFF',
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
    },
    sectionTitle: {
        ...lightTheme.typography.h2,
        marginBottom: 8,
    },
    step: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    stepNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: lightTheme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    stepNumberText: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'Poppins-Bold',
    },
    stepText: {
        ...lightTheme.typography.body,
        flex: 1,
    },
    actionButton: {
        marginTop: 24,
    },
});
