import { Sidebar } from "@/components/dashboard/layout/Sidebar";
import { TopBar } from "@/components/dashboard/layout/TopBar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="lg:pl-64">
                <TopBar />
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
