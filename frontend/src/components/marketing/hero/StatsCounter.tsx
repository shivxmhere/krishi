'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface StatsCounterProps {
    end: number;
    suffix?: string;
    label?: string;
    duration?: number;
}

export const StatsCounter = ({ end, suffix = '', label, duration = 2 }: StatsCounterProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (inView) {
            motionValue.set(end);
        }
    }, [inView, end, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                {displayValue}{suffix}
            </div>
            {label && <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>}
        </div>
    );
};
