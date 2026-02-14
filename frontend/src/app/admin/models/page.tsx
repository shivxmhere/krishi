'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Play,
    Pause,
    RotateCcw,
    BarChart3,
    Upload,
    CheckCircle,
    AlertCircle,
    Clock,
    History,
    TrendingUp,
    Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MLModel {
    id: string;
    name: string;
    version: string;
    status: 'active' | 'inactive' | 'training' | 'error';
    accuracy: number;
    latency: number;
    lastTrained: string;
    datasetSize: number;
    trainingJob?: {
        progress: number;
        epoch: number;
        totalEpochs: number;
        loss: number;
        accuracy: number;
        estimatedTimeRemaining: string;
    };
}

const mockModels: MLModel[] = [
    {
        id: '1', name: 'Disease-Guard V2', version: '2.4.0', status: 'active', accuracy: 98.4, latency: 95, lastTrained: '2024-02-01', datasetSize: 52000
    },
    {
        id: '2', name: 'Crop-Yield Predictor', version: '1.2.5', status: 'training', accuracy: 89.2, latency: 150, lastTrained: '2024-02-10', datasetSize: 15000,
        trainingJob: { progress: 65, epoch: 32, totalEpochs: 50, loss: 0.12, accuracy: 0.91, estimatedTimeRemaining: '45 mins' }
    },
    {
        id: '3', name: 'Soil-X Analyzer', version: '1.0.2', status: 'inactive', accuracy: 92.0, latency: 110, lastTrained: '2024-01-15', datasetSize: 8000
    },
];

export default function ModelManagementPage() {
    const [models, setModels] = useState<MLModel[]>(mockModels);
    const [selectedModel, setSelectedModel] = useState<MLModel | null>(null);

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        ML Model Management
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Deploy, monitor, and retrain agricultural AI models
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline">
                        <History className="w-4 h-4 mr-2" />
                        Training logs
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                        <Upload className="w-4 h-4 mr-2" />
                        Deploy New Version
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {models.map((model) => (
                    <ModelCard
                        key={model.id}
                        model={model}
                        onDeploy={() => { }}
                        onTrain={() => { }}
                    />
                ))}
            </div>

            {/* Model Analytics Section */}
            <div className="space-y-6 pt-8">
                <h2 className="text-2xl font-bold">In-Depth Model Analytics</h2>
                <Tabs defaultValue="accuracy" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-3 bg-gray-100 dark:bg-gray-800">
                        <TabsTrigger value="accuracy">Accuracy Curve</TabsTrigger>
                        <TabsTrigger value="latency">Latency Distribution</TabsTrigger>
                        <TabsTrigger value="usage">Inference Traffic</TabsTrigger>
                    </TabsList>
                    <TabsContent value="accuracy" className="mt-6">
                        <Card className="border-none shadow-lg h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900/50">
                            <div className="text-center">
                                <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4 opacity-50" />
                                <p className="text-gray-500 font-medium">Accuracy trend across versions (Visualizer Placeholder)</p>
                            </div>
                        </Card>
                    </TabsContent>
                    <TabsContent value="latency" className="mt-6">
                        <Card className="border-none shadow-lg h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900/50">
                            <div className="text-center">
                                <Activity className="w-12 h-12 text-blue-500 mx-auto mb-4 opacity-50" />
                                <p className="text-gray-500 font-medium">Latency p95/p99 distribution (Visualizer Placeholder)</p>
                            </div>
                        </Card>
                    </TabsContent>
                    <TabsContent value="usage" className="mt-6">
                        <Card className="border-none shadow-lg h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900/50">
                            <div className="text-center">
                                <Clock className="w-12 h-12 text-purple-500 mx-auto mb-4 opacity-50" />
                                <p className="text-gray-500 font-medium">Real-time inference load (Visualizer Placeholder)</p>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

function ModelCard({ model, onDeploy, onTrain }: any) {
    const statusColors: any = {
        active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
        training: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
        >
            {model.status === 'active' && (
                <div className="absolute top-0 right-0 p-1 bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-bl-lg">
                    Live Prod
                </div>
            )}

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">
                        {model.name}
                    </h3>
                    <p className="text-sm font-mono text-gray-500 mt-1">v{model.version}</p>
                </div>
                <Badge variant="outline" className={`${statusColors[model.status]} border-none font-semibold capitalize`}>
                    {model.status}
                </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Accuracy</p>
                    <p className="text-lg font-bold text-green-600">{model.accuracy}%</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Latency</p>
                    <p className="text-lg font-bold text-blue-600">{model.latency}ms</p>
                </div>
            </div>

            {model.trainingJob ? (
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium text-blue-600">
                            <Clock className="w-4 h-4 animate-spin" /> Training...
                        </span>
                        <span className="text-gray-500">{model.trainingJob.progress}%</span>
                    </div>
                    <Progress value={model.trainingJob.progress} className="h-2 bg-gray-100 dark:bg-gray-900" />
                    <p className="text-[11px] text-gray-400">
                        Epoch {model.trainingJob.epoch}/{model.trainingJob.totalEpochs} • ~{model.trainingJob.estimatedTimeRemaining} left
                    </p>
                </div>
            ) : (
                <div className="mb-6 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Dataset Size</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{model.datasetSize.toLocaleString()} imgs</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Last Trained</span>
                        <span className="text-gray-700 dark:text-gray-300">{model.lastTrained}</span>
                    </div>
                </div>
            )}

            <div className="flex gap-2">
                {model.status === 'inactive' && (
                    <Button size="sm" onClick={onDeploy} className="flex-1 bg-green-600 hover:bg-green-700">
                        <Play className="w-4 h-4 mr-2" /> Deploy
                    </Button>
                )}
                {model.status === 'active' && (
                    <Button size="sm" variant="outline" className="flex-1">
                        <Pause className="w-4 h-4 mr-2" /> Stop Agent
                    </Button>
                )}
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={onTrain}
                    disabled={model.status === 'training'}
                    className="flex-1"
                >
                    <RotateCcw className="w-4 h-4 mr-2" /> Retrain
                </Button>
            </div>
        </motion.div>
    );
}
