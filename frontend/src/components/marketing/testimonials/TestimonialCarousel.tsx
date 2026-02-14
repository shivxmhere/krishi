'use client';

import { Card, CardContent } from "@/components/ui/card";

export const TestimonialCarousel = () => (
    <section className="py-20">
        <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Trusted by Farmers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-800">
                        <CardContent className="pt-6">
                            <p className="italic mb-4 text-gray-700 dark:text-gray-300">"This app saved my tomato crop from blight. Highly recommended!"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-300" />
                                <div>
                                    <p className="font-semibold">Farmer Name</p>
                                    <p className="text-sm text-gray-500">Punjab, India</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);
