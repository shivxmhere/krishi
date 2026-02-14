'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {
    Users,
    Scan,
    Activity,
    TrendingUp,
    AlertTriangle,
    Server,
    Database,
    Cpu,
    Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';

interface Alert {
    id: string;
    type: 'info' | 'warning' | 'error';
    message: string;
    timestamp: string;
}

interface SystemMetrics {
    activeUsers: number;
    totalScans: number;
    scansToday: number;
    apiRequests: number;
    modelAccuracy: number;
    systemHealth: {
        database: 'healthy' | 'warning' | 'critical';
        api: 'healthy' | 'warning' | 'critical';
        ml: 'healthy' | 'warning' | 'critical';
    };
    recentAlerts: Alert[];
    userGrowth: { date: string; users: number }[];
    scanVolume: { date: string; scans: number }[];
    modelPerformance: { model: string; accuracy: number; latency: number }[];
    geographicDistribution: { region: string; users: number }[];
}

export default function AdminDashboardPage() {
    const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

    useEffect(() => {
        fetchMetrics();
        const interval = setInterval(fetchMetrics, 30000); // Real-time updates every 30s
        return () => clearInterval(interval);
    }, [selectedTimeRange]);

    const fetchMetrics = async () => {
        try {
            // Since it's a new setup, mock api.admin.getMetrics for now if it doesn't exist
            // In a real scenario, we'd wait for API but here we want a working UI
            const mockData: SystemMetrics = {
                activeUsers: 12543,
                totalScans: 89032,
                scansToday: 1243,
                apiRequests: 450231,
                modelAccuracy: 98.4,
                systemHealth: {
                    database: 'healthy',
                    api: 'healthy',
                    ml: 'healthy'
                },
                recentAlerts: [
                    { id: '1', type: 'warning', message: 'API latency spike in AP-South region', timestamp: '5 mins ago' },
                    { id: '2', type: 'info', message: 'Model v2.4 rollout completed', timestamp: '1 hour ago' }
                ],
                userGrowth: [
                    { date: 'Mon', users: 10000 },
                    { date: 'Tue', users: 10500 },
                    { date: 'Wed', users: 11000 },
                    { date: 'Thu', users: 11500 },
                    { date: 'Fri', users: 12000 },
                    { date: 'Sat', users: 12300 },
                    { date: 'Sun', users: 12543 }
                ],
                scanVolume: [
                    { date: 'Mon', scans: 800 },
                    { date: 'Tue', scans: 950 },
                    { date: 'Wed', scans: 1100 },
                    { date: 'Thu', scans: 1050 },
                    { date: 'Fri', scans: 1200 },
                    { date: 'Sat', scans: 1300 },
                    { date: 'Sun', scans: 1243 }
                ],
                modelPerformance: [
                    { model: 'v2.1', accuracy: 94, latency: 120 },
                    { model: 'v2.2', accuracy: 96, latency: 110 },
                    { model: 'v2.3', accuracy: 97, latency: 105 },
                    { model: 'v2.4', accuracy: 98.4, latency: 95 }
                ],
                geographicDistribution: [
                    { region: 'North', users: 4500 },
                    { region: 'South', users: 3200 },
                    { region: 'East', users: 2100 },
                    { region: 'West', users: 2743 }
                ]
            };
            setMetrics(mockData);
        } catch (error) {
            console.error('Failed to fetch metrics:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="p-8">Loading Dashboard...</div>;

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        System Overview
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Real-time monitoring and analytics
                    </p>
                </div>

                <div className="flex gap-2">
                    {['24h', '7d', '30d', '90d'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setSelectedTimeRange(range)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedTimeRange === range
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            {range === '24h' ? 'Last 24 Hours' : `Last ${range}`}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Active Users"
                    value={metrics?.activeUsers.toLocaleString()}
                    change="+12.5%"
                    icon={Users}
                    trend="up"
                    color="blue"
                />
                <KPICard
                    title="Total Scans"
                    value={metrics?.totalScans.toLocaleString()}
                    change="+8.2%"
                    icon={Scan}
                    trend="up"
                    color="green"
                />
                <KPICard
                    title="API Requests"
                    value={metrics?.apiRequests.toLocaleString()}
                    change="+23.1%"
                    icon={Activity}
                    trend="up"
                    color="purple"
                />
                <KPICard
                    title="Model Accuracy"
                    value={`${metrics?.modelAccuracy}%`}
                    change="+2.3%"
                    icon={TrendingUp}
                    trend="up"
                    color="orange"
                />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* User Growth Chart */}
                <Card className="col-span-1 border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-500" />
                            User Growth
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={metrics?.userGrowth}>
                                    <defs>
                                        <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="users"
                                        stroke="#3B82F6"
                                        fillOpacity={1}
                                        fill="url(#userGradient)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Scan Volume Chart */}
                <Card className="col-span-1 border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Scan className="w-5 h-5 text-green-500" />
                            Scan Volume
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={metrics?.scanVolume}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff'
                                        }}
                                    />
                                    <Bar
                                        dataKey="scans"
                                        fill="#22C55E"
                                        radius={[4, 4, 0, 0]}
                                        maxBarSize={40}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Model Performance */}
                <Card className="col-span-2 border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Cpu className="w-5 h-5 text-purple-500" />
                            ML Model Performance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={metrics?.modelPerformance}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                    <XAxis dataKey="model" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff'
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="accuracy"
                                        stroke="#8B5CF6"
                                        strokeWidth={3}
                                        dot={{ fill: '#8B5CF6', r: 4, strokeWidth: 2 }}
                                        activeDot={{ r: 6 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="latency"
                                        stroke="#F59E0B"
                                        strokeWidth={3}
                                        dot={{ fill: '#F59E0B', r: 4, strokeWidth: 2 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Geographic Distribution */}
                <Card className="col-span-1 border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Database className="w-5 h-5 text-orange-500" />
                            Geographic Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={metrics?.geographicDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="users"
                                    >
                                        {metrics?.geographicDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* System Health & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <SystemHealthCard health={metrics?.systemHealth} />
                <RecentAlertsCard alerts={metrics?.recentAlerts} />
                <QuickActionsCard />
            </div>
        </div>
    );
}

const COLORS = ['#22C55E', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

function KPICard({ title, value, change, icon: Icon, trend, color }: any) {
    const colorClasses: any = {
        blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
        green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
        purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
        orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
                    <div className="flex items-center gap-1 mt-2">
                        <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {change}
                        </span>
                        <span className="text-sm text-gray-400 ml-1">vs last period</span>
                    </div>
                </div>
                <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </motion.div>
    );
}

function SystemHealthCard({ health }: any) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'healthy': return 'bg-green-500';
            case 'warning': return 'bg-yellow-500';
            case 'critical': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <Card className="border-none shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-gray-500" />
                    System Health
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {Object.entries(health || {}).map(([service, status]: [string, any]) => (
                    <div key={service} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse`} />
                            <span className="capitalize font-medium text-gray-700 dark:text-gray-300">{service}</span>
                        </div>
                        <span className={`text-sm font-semibold ${status === 'healthy' ? 'text-green-600' : status === 'warning' ? 'text-yellow-600' : 'text-red-600'}`}>
                            {status.toUpperCase()}
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function RecentAlertsCard({ alerts }: { alerts?: Alert[] }) {
    return (
        <Card className="border-none shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    Recent Alerts
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {alerts?.map((alert) => (
                    <div key={alert.id} className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                        <div className={`w-1 h-auto rounded-full ${alert.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                        <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.message}</p>
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                {alert.timestamp}
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function QuickActionsCard() {
    return (
        <Card className="border-none shadow-lg bg-gradient-to-br from-green-600 to-emerald-700 text-white">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                    <Activity className="w-5 h-5" />
                    Quick Actions
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm flex items-center justify-center gap-2">
                    Sync ML Model
                </button>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm flex items-center justify-center gap-2">
                    Flush API Cache
                </button>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm flex items-center justify-center gap-2">
                    Generate System Report
                </button>
            </CardContent>
        </Card>
    );
}
