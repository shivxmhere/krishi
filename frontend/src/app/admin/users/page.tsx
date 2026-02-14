'use client';

import { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper
} from '@tanstack/react-table';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    Download,
    UserPlus,
    Mail,
    Ban,
    CheckCircle,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

interface User {
    id: string;
    email: string;
    fullName: string;
    role: 'farmer' | 'admin' | 'researcher';
    status: 'active' | 'suspended' | 'pending';
    createdAt: string;
    lastLogin: string;
    totalScans: number;
    location: string;
}

const mockUsers: User[] = [
    { id: '1', email: 'john@example.com', fullName: 'John Doe', role: 'farmer', status: 'active', createdAt: '2024-01-01', lastLogin: '2 hours ago', totalScans: 45, location: 'Punjab, India' },
    { id: '2', email: 'alice@krishi.ai', fullName: 'Alice Smith', role: 'admin', status: 'active', createdAt: '2023-12-15', lastLogin: '10 mins ago', totalScans: 0, location: 'Bangalore, India' },
    { id: '3', email: 'robert@research.org', fullName: 'Robert Brown', role: 'researcher', status: 'pending', createdAt: '2024-02-10', lastLogin: 'Never', totalScans: 12, location: 'Pune, India' },
    { id: '4', email: 'malicious@hacker.com', fullName: 'Anonymous User', role: 'farmer', status: 'suspended', createdAt: '2024-01-20', lastLogin: '1 week ago', totalScans: 3, location: 'Unknown' },
];

export default function UserManagementPage() {
    const [data, setData] = useState<User[]>(mockUsers);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isExporting, setIsExporting] = useState(false);

    const columnHelper = createColumnHelper<User>();

    const columns = useMemo(
        () => [
            columnHelper.accessor('fullName', {
                header: 'User',
                cell: (info) => (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-semibold">
                            {info.getValue().charAt(0)}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">{info.getValue()}</p>
                            <p className="text-sm text-gray-500">{info.row.original.email}</p>
                        </div>
                    </div>
                ),
            }),
            columnHelper.accessor('role', {
                header: 'Role',
                cell: (info) => (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${info.getValue() === 'admin'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                            : info.getValue() === 'researcher'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        }`}>
                        {info.getValue().toUpperCase()}
                    </span>
                ),
            }),
            columnHelper.accessor('status', {
                header: 'Status',
                cell: (info) => (
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${info.getValue() === 'active' ? 'bg-green-500' :
                                info.getValue() === 'suspended' ? 'bg-red-500' : 'bg-yellow-500'
                            }`} />
                        <span className="capitalize">{info.getValue()}</span>
                    </div>
                ),
            }),
            columnHelper.accessor('totalScans', {
                header: 'Activity',
                cell: (info) => (
                    <div>
                        <p className="font-medium">{info.getValue()} scans</p>
                        <p className="text-sm text-gray-500">Last login: {info.row.original.lastLogin}</p>
                    </div>
                ),
            }),
            columnHelper.accessor('location', {
                header: 'Location',
                cell: (info) => (
                    <span className="text-gray-600 dark:text-gray-400">{info.getValue()}</span>
                ),
            }),
            columnHelper.display({
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email
                            </DropdownMenuItem>
                            {row.original.status === 'active' ? (
                                <DropdownMenuItem className="text-red-600">
                                    <Ban className="w-4 h-4 mr-2" />
                                    Suspend
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem className="text-green-600">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Activate
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            }),
        ],
        []
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => setIsExporting(false), 2000);
    };

    return (
        <div className="p-8 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        User Management
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        {table.getFilteredRowModel().rows.length} total users in system
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleExport} disabled={isExporting}>
                        <Download className={`w-4 h-4 mr-2 ${isExporting ? 'animate-bounce' : ''}`} />
                        {isExporting ? 'Exporting...' : 'Export CSV'}
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-green-600 hover:bg-green-700">
                                <UserPlus className="w-4 h-4 mr-2" />
                                Add New User
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add User</DialogTitle>
                            </DialogHeader>
                            <div className="p-4 space-y-4">
                                <Input placeholder="Full Name" />
                                <Input placeholder="Email Address" type="email" />
                                <select className="w-full p-2 rounded-md border border-gray-200 dark:bg-gray-800">
                                    <option value="farmer">Farmer</option>
                                    <option value="researcher">Researcher</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <Button className="w-full">Create Account</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex gap-4 items-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search by name, email, or location..."
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="pl-10 h-10 bg-gray-50 dark:bg-gray-900/50 border-none"
                    />
                </div>
                <Button variant="outline" size="sm" className="h-10">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                </Button>
                {globalFilter && (
                    <Button variant="ghost" size="sm" onClick={() => setGlobalFilter('')} className="text-gray-500">
                        <X className="w-4 h-4 mr-1" /> Clear
                    </Button>
                )}
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider"
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            <AnimatePresence>
                                {table.getRowModel().rows.map((row) => (
                                    <motion.tr
                                        key={row.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors group"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-6 py-4 text-sm">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Container */}
            <div className="flex items-center justify-between px-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">
                        {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                    </span> to <span className="font-semibold text-gray-900 dark:text-white">
                        {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}
                    </span> of <span className="font-semibold text-gray-900 dark:text-white">
                        {table.getFilteredRowModel().rows.length}
                    </span> users
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="h-8 w-8 p-0"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="flex gap-1">
                        {[...Array(table.getPageCount())].map((_, i) => (
                            <Button
                                key={i}
                                variant={table.getState().pagination.pageIndex === i ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => table.setPageIndex(i)}
                                className="h-8 w-8 p-0 text-xs"
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="h-8 w-8 p-0"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
