'use client';

import { Button } from "@/components/ui/button";

export const CTASection = () => (
    <section className="py-24 bg-green-600 dark:bg-green-900 text-white text-center">
        <div className="container px-4 mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to maximize your yield?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">Join thousands of farmers using Krishi to protect their crops.</p>
            <Button size="lg" variant="secondary" className="bg-white text-green-700 hover:bg-gray-100 rounder-full px-8">Get Started for Free</Button>
        </div>
    </section>
);
