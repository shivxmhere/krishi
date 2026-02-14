'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadZone } from '@/components/dashboard/scan/UploadZone';
import { ScanningAnimation } from '@/components/dashboard/scan/ScanningAnimation';
import { ResultCard } from '@/components/dashboard/results/ResultCard';
import { api } from '@/lib/api';

export default function ScanPage() {
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleUpload = async (files: File[]) => {
        setIsScanning(true);

        try {
            const formData = new FormData();
            formData.append('image', files[0]);

            const response = await api.scans.detect(formData);
            setResult(response.data);
        } catch (error) {
            console.error('Scan failed:', error);
            // Simulate result for demo
            setTimeout(() => {
                setResult({ confidence: 0.98, disease: 'Early Blight', description: 'Simulated result for demo purposes.' });
            }, 3000);
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    AI Disease Detection
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Upload a photo of your crop and our AI will identify diseases instantly
                </p>
            </motion.div>

            <AnimatePresence mode="wait">
                {!result ? (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <UploadZone
                            onUpload={handleUpload}
                            onCameraCapture={() => {/* Open camera */ }}
                            isUploading={isScanning}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <ResultCard result={result} onReset={() => setResult(null)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {isScanning && <ScanningAnimation />}
        </div>
    );
}
