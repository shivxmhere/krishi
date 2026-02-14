'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Scan, History, Sprout, TrendingUp, Settings } from "lucide-react";

export const Sidebar = () => {
    const pathname = usePathname();

    const links = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/scan", label: "New Scan", icon: Scan },
        { href: "/dashboard/history", label: "History", icon: History },
        { href: "/dashboard/crops", label: "My Crops", icon: Sprout },
        { href: "/dashboard/market", label: "Market", icon: TrendingUp },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden lg:flex flex-col h-screen fixed left-0 top-0">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-green-600">Krishi</h1>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                {links.map((link) => (
                    <Link key={link.href} href={link.href}>
                        <Button
                            variant={pathname === link.href ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start gap-3 mb-1",
                                pathname === link.href && "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            )}
                        >
                            <link.icon className="h-4 w-4" />
                            {link.label}
                        </Button>
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900" />
                    <div>
                        <p className="font-medium text-sm">John Doe</p>
                        <p className="text-xs text-gray-500">Premium Plan</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};
