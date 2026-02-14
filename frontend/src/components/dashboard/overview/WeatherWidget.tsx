'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain } from "lucide-react";

export const WeatherWidget = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Weather Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <CloudRain className="h-10 w-10 text-blue-500" />
                        <div>
                            <p className="text-2xl font-bold">24°C</p>
                            <p className="text-gray-500">Light Rain</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium">H: 26° L: 18°</p>
                        <p className="text-xs text-gray-500">Bangalore</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
