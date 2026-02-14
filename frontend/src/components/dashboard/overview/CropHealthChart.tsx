'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CropHealthChart = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Crop Health Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-md">
                <p className="text-gray-400">Chart Visualization Placeholder</p>
            </CardContent>
        </Card>
    );
};
