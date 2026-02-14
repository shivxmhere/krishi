'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import scanAnimation from '@/public/animations/scan.json';

export const ScanningAnimation = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
            >
                {/* Lottie animation */}
                <div className="w-64 h-64 mx-auto mb-8">
                    <Lottie animationData={scanAnimation} loop={true} />
                </div>

                {/* Progress text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3 className="text-2xl font-semibold text-white mb-2">
                        AI Analyzing Image...
                    </h3>

                    <div className="flex items-center justify-center gap-2 text-green-400">
                        <motion.span
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            Detecting disease patterns
                        </motion.span>
                    </div>
                </motion.div>

                {/* Progress bar */}
                <div className="mt-8 w-64 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto">
                    <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3, ease: 'easeInOut' }}
                    />
                </div>

                {/* Processing steps */}
                <div className="mt-8 space-y-2">
                    {['Preprocessing image', 'Running ML models', 'Analyzing results', 'Generating report'].map((step, index) => (
                        <motion.div
                            key={step}
                            className="flex items-center justify-center gap-2 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.5 }}
                        >
                            <motion.div
                                className="w-4 h-4 rounded-full bg-green-500"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.5 }}
                            />
                            <span className="text-gray-300">{step}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
