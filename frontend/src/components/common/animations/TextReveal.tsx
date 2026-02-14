'use client';

import { motion } from 'framer-motion';

interface TextRevealProps {
    text: string;
    delay?: number;
    className?: string;
}

export const TextReveal = ({ text, delay = 0, className = '' }: TextRevealProps) => {
    const words = text.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay }
        })
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 20,
            rotateX: -90
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100
            }
        }
    };

    return (
        <motion.span
            className={`inline-flex flex-wrap ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    className="mr-2 inline-block perspective-1000"
                    variants={child}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
};
