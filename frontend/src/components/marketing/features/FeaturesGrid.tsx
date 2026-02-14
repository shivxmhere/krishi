'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const FeaturesGrid = () => (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
                <Badge variant="secondary" className="mb-4">Features</Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Advanced Agriculture</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Everything you need to manage your farm efficiently using AI.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: "AI Disease Detection", desc: "Identify crop diseases instantly with 98% accuracy" },
                    { title: "Smart Advisory", desc: "Get real-time farming advice from our AI expert" },
                    { title: "Market Analytics", desc: "Track market prices and predict future trends" }
                ].map((feature, i) => (
                    <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-all">
                        <CardHeader>
                            <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);
