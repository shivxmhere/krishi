'use client';

import { Button } from "@/components/ui/button";
import { Scan, CloudSun, Sprout, TrendingUp } from "lucide-react";

export const QuickActions = () => {
    const actions = [
        { label: "New Scan", icon: Scan },
        { label: "Weather", icon: CloudSun },
        { label: "Add Crop", icon: Sprout },
        { label: "Market", icon: TrendingUp },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {actions.map((action) => (
                <Button key={action.label} variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <action.icon className="h-6 w-6" />
                    {action.label}
                </Button>
            ))}
        </div>
    );
};
