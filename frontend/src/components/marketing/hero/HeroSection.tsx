'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextReveal } from '@/components/common/animations/TextReveal';
import { MagneticButton } from '@/components/common/animations/MagneticButton';
import { FloatingElements } from './FloatingElements';
import { StatsCounter } from './StatsCounter';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    // Parallax effects
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    // Spring physics for smooth animation
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const scaleSpring = useSpring(scale, springConfig);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-gray-900"
        >
            {/* Animated background pattern */}
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{ y, scale: scaleSpring }}
            >
                <div className="absolute inset-0 bg-[url('/images/hero/pattern.svg')] bg-repeat opacity-20" />
            </motion.div>

            {/* Floating leaves animation */}
            <FloatingElements />

            {/* Main content */}
            <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium mb-6"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            AI-Powered Agriculture
                        </motion.div>

                        {/* Main headline with text reveal */}
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            <TextReveal text="Protect Your Crops" delay={0.3} />
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                                <TextReveal text="With AI Precision" delay={0.5} />
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg"
                        >
                            Detect diseases instantly, get AI-powered treatment recommendations,
                            and maximize your yield with our advanced agricultural intelligence platform.
                        </motion.p>

                        {/* CTA Buttons with magnetic effect */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="flex flex-wrap gap-4"
                        >
                            <MagneticButton
                                size="lg"
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg shadow-green-600/30 hover:shadow-green-600/50 transition-shadow"
                                onClick={() => window.location.href = '/scan'}
                            >
                                Start Free Scan
                                <motion.span
                                    className="ml-2 inline-block"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    →
                                </motion.span>
                            </MagneticButton>

                            <MagneticButton
                                variant="outline"
                                size="lg"
                                className="border-2 border-gray-300 dark:border-gray-600 hover:border-green-600 dark:hover:border-green-400 px-8 py-4 rounded-full text-lg font-semibold"
                            >
                                Watch Demo
                            </MagneticButton>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1 }}
                            className="mt-12 grid grid-cols-3 gap-8"
                        >
                            <StatsCounter end={50000} suffix="+" label="Farmers Helped" />
                            <StatsCounter end={98} suffix="%" label="Accuracy Rate" />
                            <StatsCounter end={38} label="Diseases Detected" />
                        </motion.div>
                    </motion.div>

                    {/* Right: Hero image with 3D tilt effect */}
                    <motion.div
                        initial={{ opacity: 0, x: 100, rotateY: 15 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-green-600/20">
                            <motion.img
                                src="/images/hero/hero-main.jpg"
                                alt="Farmer using Krishi app"
                                className="w-full h-auto"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                            />

                            {/* Floating UI cards */}
                            <motion.div
                                className="absolute -left-8 top-1/4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Disease Detected</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">Tomato Blight</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute -right-4 bottom-1/4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Treatment Applied</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">95% Effective</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center pt-2">
                    <motion.div
                        className="w-1.5 h-3 rounded-full bg-gray-400 dark:bg-gray-600"
                        animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                </div>
            </motion.div>
        </section>
    );
};
