'use client';

import { motion } from 'framer-motion';
import { WelcomeBanner } from '@/components/dashboard/overview/WelcomeBanner';
import { QuickActions } from '@/components/dashboard/overview/QuickActions';
import { StatsCards } from '@/components/dashboard/overview/StatsCards';
import { RecentScans } from '@/components/dashboard/overview/RecentScans';
import { WeatherWidget } from '@/components/dashboard/overview/WeatherWidget';
import { CropHealthChart } from '@/components/dashboard/overview/CropHealthChart';

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <WelcomeBanner />
            </motion.div>

            <QuickActions />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCards />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <RecentScans />
                </div>
                <div className="space-y-6">
                    <WeatherWidget />
                    <CropHealthChart />
                </div>
            </div>
        </div>
    );
}
