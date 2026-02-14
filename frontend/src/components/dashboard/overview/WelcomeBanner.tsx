'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const WelcomeBanner = () => {
    return (
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Farmer!</h1>
            <p className="opacity-90 mb-6">Here's what's happening on your farm today.</p>
            <Button variant="secondary" className="bg-white text-green-700 hover:bg-gray-100">
                View Reports
            </Button>
        </div>
    );
};
