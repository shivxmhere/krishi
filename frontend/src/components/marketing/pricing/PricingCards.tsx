'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const PricingCards = () => (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Simple Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card>
                    <CardHeader><CardTitle>Free</CardTitle></CardHeader>
                    <CardContent><p className="text-4xl font-bold mb-4">₹0</p><p>Basic scanning</p></CardContent>
                    <CardFooter><Button className="w-full" variant="outline">Get Started</Button></CardFooter>
                </Card>
                <Card className="border-green-500 border-2 shadow-xl relative scale-105">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">Popular</div>
                    <CardHeader><CardTitle>Pro</CardTitle></CardHeader>
                    <CardContent><p className="text-4xl font-bold mb-4">₹499<span className="text-sm font-normal">/yr</span></p><p>Advanced analysis & Advisory</p></CardContent>
                    <CardFooter><Button className="w-full">Subscribe Now</Button></CardFooter>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Enterprise</CardTitle></CardHeader>
                    <CardContent><p className="text-4xl font-bold mb-4">Custom</p><p>For huge farms</p></CardContent>
                    <CardFooter><Button className="w-full" variant="outline">Contact Sales</Button></CardFooter>
                </Card>
            </div>
        </div>
    </section>
);
