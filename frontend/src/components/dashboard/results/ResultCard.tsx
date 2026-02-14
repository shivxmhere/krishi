'use client';

// Placeholder ResultCard
import { ConfidenceMeter } from '../results/ConfidenceMeter';
import { Button } from '@/components/ui/button';

interface ResultCardProps {
    result: any;
    onReset: () => void;
}

export const ResultCard = ({ result, onReset }: ResultCardProps) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analysis Result</h2>
                    <p className="text-gray-500">AI has detected potential issues</p>
                </div>
                <ConfidenceMeter value={result?.confidence || 0.95} size="lg" />
            </div>

            <div className="space-y-6">
                <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800">
                    <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-2">
                        {result?.disease || 'Early Blight Detected'}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        {result?.description || 'Fungal infection affecting leaves and stems. Characterized by dark spots with concentric rings.'}
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Recommended Treatment</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                        <li>Apply copper-based fungicide</li>
                        <li>Remove infected leaves immediately</li>
                        <li>Improve air circulation around plants</li>
                    </ul>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button onClick={onReset} className="w-full">
                        Scan Another Image
                    </Button>
                </div>
            </div>
        </div>
    );
};
