'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Droplets, Sun, Wind, Sprout } from "lucide-react";

export const StatsCards = () => {
    const stats = [
        { label: "Total Crops", value: "12", icon: Sprout, change: "+2" },
        { label: "Active Alerts", value: "3", icon: Activity, change: "-1", intent: "danger" },
        { label: "Soil Moisture", value: "65%", icon: Droplets, change: "Optimal" },
        { label: "Temperature", value: "24°C", icon: Sun, change: "+2°C" },
    ];

    return (
        <>
            {stats.map((stat, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.label}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {stat.change}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </>
    );
};
