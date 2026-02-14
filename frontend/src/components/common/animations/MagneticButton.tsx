'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg';
    onClick?: () => void;
}

export const MagneticButton = ({
    children,
    className,
    variant = 'default',
    size = 'default',
    onClick
}: MagneticButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 4;
        const y = (clientY - top - height / 2) / 4;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const variants = {
        default: 'bg-green-600 text-white hover:bg-green-700',
        outline: 'border-2 border-gray-300 bg-transparent hover:border-green-600 hover:text-green-600',
        ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
    };

    const sizes = {
        default: 'px-6 py-3 text-base',
        sm: 'px-4 py-2 text-sm',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <motion.button
            ref={ref}
            className={cn(
                'relative rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
                variants[variant],
                sizes[size],
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>

            {/* Ripple effect on hover */}
            <motion.span
                className="absolute inset-0 rounded-full bg-white/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 1 }}
                transition={{ duration: 0.4 }}
            />
        </motion.button>
    );
};
