'use client';

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Scan, Camera, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface UploadZoneProps {
    onUpload: (files: File[]) => void;
    onCameraCapture: () => void;
    isUploading?: boolean;
}

export const UploadZone = ({ onUpload, onCameraCapture, isUploading }: UploadZoneProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        onUpload(acceptedFiles);
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024 // 10MB
    });

    const removeFile = () => {
        setFiles([]);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
                {files.length === 0 ? (
                    <motion.div
                        key="dropzone"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative"
                    >
                        <div
                            {...getRootProps()}
                            className={cn(
                                'relative border-3 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300',
                                isDragActive
                                    ? 'border-green-500 bg-green-50 dark:bg-green-950/30 scale-105'
                                    : 'border-gray-300 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-600 bg-white dark:bg-gray-900'
                            )}
                        >
                            <input {...getInputProps()} />

                            {/* Animated background gradient */}
                            <motion.div
                                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20"
                                animate={{
                                    background: isDragActive
                                        ? 'linear-gradient(90deg, rgba(74, 222, 128, 0.3) 0%, rgba(52, 211, 153, 0.3) 50%, rgba(45, 212, 191, 0.3) 100%)'
                                        : 'linear-gradient(90deg, rgba(74, 222, 128, 0) 0%, rgba(52, 211, 153, 0) 50%, rgba(45, 212, 191, 0) 100%)'
                                }}
                                transition={{ duration: 0.3 }}
                            />

                            <div className="relative z-10">
                                {/* Animated upload icon */}
                                <motion.div
                                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center"
                                    animate={isDragActive ? { scale: 1.1, rotate: 10 } : { scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <Upload className="w-12 h-12 text-green-600 dark:text-green-400" />
                                </motion.div>

                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {isDragActive ? 'Drop your image here' : 'Upload crop image'}
                                </h3>

                                <p className="text-gray-500 dark:text-gray-400 mb-6">
                                    Drag and drop your image, or click to browse
                                </p>

                                <div className="flex items-center justify-center gap-4 text-sm text-gray-400 dark:text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <ImageIcon className="w-4 h-4" />
                                        JPG, PNG, WebP
                                    </span>
                                    <span>•</span>
                                    <span>Max 10MB</span>
                                </div>
                            </div>

                            {/* Corner decorations */}
                            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-green-400 rounded-tl-lg" />
                            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-green-400 rounded-tr-lg" />
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-green-400 rounded-bl-lg" />
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-green-400 rounded-br-lg" />
                        </div>

                        {/* Camera button */}
                        <motion.div
                            className="mt-6 flex justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCameraCapture();
                                }}
                                className="rounded-full px-8"
                            >
                                <Camera className="w-5 h-5 mr-2" />
                                Use Camera Instead
                            </Button>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800"
                    >
                        <img
                            src={URL.createObjectURL(files[0])}
                            alt="Preview"
                            className="w-full h-96 object-cover"
                        />

                        {/* Overlay with scan button */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.2 }}
                            >
                                <Button
                                    size="lg"
                                    className="rounded-full px-8 py-6 text-lg bg-green-600 hover:bg-green-700 shadow-2xl"
                                    onClick={() => onUpload(files)}
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <motion.div
                                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                        />
                                    ) : (
                                        <>
                                            <Scan className="w-6 h-6 mr-2" />
                                            Start AI Analysis
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </div>

                        {/* Remove button */}
                        <motion.button
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-lg"
                            onClick={removeFile}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
