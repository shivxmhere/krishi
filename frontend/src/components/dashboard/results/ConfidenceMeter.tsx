'use client';

import { motion } from 'framer-motion';

interface ConfidenceMeterProps {
    value: number; // 0-1
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}

export const ConfidenceMeter = ({ value, size = 'md', showLabel = true }: ConfidenceMeterProps) => {
    const percentage = Math.round(value * 100);

    const sizes = {
        sm: { width: 80, stroke: 8, font: 'text-sm' },
        md: { width: 120, stroke: 12, font: 'text-lg' },
        lg: { width: 160, stroke: 16, font: 'text-2xl' }
    };

    const { width, stroke, font } = sizes[size];
    const radius = (width - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - value);

    const getColor = (val: number) => {
        if (val >= 0.9) return '#22c55e'; // green-500
        if (val >= 0.7) return '#eab308'; // yellow-500
        return '#ef4444'; // red-500
    };

    const color = getColor(value);

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={width} height={width} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={width / 2}
                    cy={width / 2}
                    r={radius}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth={stroke}
                    className="dark:stroke-gray-700"
                />

                {/* Progress circle */}
                <motion.circle
                    cx={width / 2}
                    cy={width / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                />
            </svg>

            {/* Percentage text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    className={`font-bold ${font}`}
                    style={{ color }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {percentage}%
                </motion.span>
                {showLabel && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">Confidence</span>
                )}
            </div>

            {/* Pulse effect for high confidence */}
            {value >= 0.9 && (
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ borderColor: color }}
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.2, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
            )}
        </div>
    );
};
