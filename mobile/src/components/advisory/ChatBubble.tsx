import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ChatBubble = ({ message, isUser }: any) => (
    <View style={[styles.container, isUser ? styles.user : styles.bot]}>
        <Text style={styles.text}>{message}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { padding: 10, borderRadius: 8, marginVertical: 4, maxWidth: '80%' },
    user: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
    bot: { alignSelf: 'flex-start', backgroundColor: '#FFF' },
    text: { fontSize: 16 },
});
