import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../common/Card';

export const PriceCard = ({ item }: any) => (
    <Card>
        <Text>{item.name}: ₹{item.price}</Text>
    </Card>
);
