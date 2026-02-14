'use client';

import { motion } from 'framer-motion';

export const FloatingElements = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Leaf 1 */}
            <motion.div
                className="absolute top-1/4 left-10 w-8 h-8 opacity-20 bg-green-500 rounded-full blur-sm"
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    rotate: [0, 10, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            {/* Leaf 2 */}
            <motion.div
                className="absolute top-1/2 right-20 w-12 h-12 opacity-10 bg-emerald-600 rounded-full blur-md"
                animate={{
                    y: [0, 30, 0],
                    x: [0, -15, 0],
                    rotate: [0, -15, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
            {/* Add more as needed */}
        </div>
    );
};
