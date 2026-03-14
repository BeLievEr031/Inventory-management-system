"use client";

import React from "react";
import Link from "next/link";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import {
    IconFilter,
    IconExport,
    IconPlus,
    IconMeatballs,
    IconChevronDown
} from "../layout/Icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReceipts } from "@/store/receiptSlice";
import { formatDisplayDate } from "@/lib/utils";

const Receipts = () => {
    const dispatch = useAppDispatch();
    const { list, loading, error } = useAppSelector((state) => state.receipts);

    React.useEffect(() => {
        dispatch(fetchReceipts());
    }, [dispatch]);

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "Done": return "bg-green-100 text-green-600";
            case "Ready": return "bg-orange-100 text-[#ec5b13]";
            case "Waiting": return "bg-blue-100 text-blue-600";
            case "Draft": return "bg-slate-100 text-slate-500";
            case "Canceled": return "bg-red-100 text-red-600";
            default: return "bg-slate-100 text-slate-500";
        }
    };

    return (
        <div className="flex min-h-screen bg-[#f8f6f6] font-display text-slate-900">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0">
                <Header />

                {/* Breadcrumbs & Title Area */}
                <div className="px-10 pt-8 flex items-center gap-2 text-[13px] font-bold text-slate-400">
                    <span className="hover:text-slate-600 cursor-pointer">Operations</span>
                    <IconChevronDown className="rotate-[-90deg] scale-75" />
                    <span className="text-slate-900">Receipts</span>
                </div>

                <div className="px-10 pt-6 pb-10 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black text-[#011f2b]">Receipts</h1>
                            <p className="text-[14px] font-bold text-slate-400 mt-1">Manage and track incoming stock shipments.</p>
                        </div>
                        <Link href="/dashboard/receipts/new" className="bg-[#ec5b13] hover:bg-[#d44d0e] text-white px-6 py-3.5 rounded-2xl flex items-center gap-3 font-black shadow-xl shadow-orange-100 transition-all active:scale-95">
                            <IconPlus />
                            Create Receipt
                        </Link>
                    </div>

                    {/* Tabs & Filters */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-8 border-b border-slate-200 flex-1">
                            {["All Receipts", "Draft", "Waiting", "Ready", "Done", "Canceled"].map((tab, idx) => (
                                <button key={idx} className={`pb-4 text-[14px] font-black transition-all relative ${idx === 0 ? "text-[#ec5b13]" : "text-slate-400 hover:text-slate-600"}`}>
                                    {tab}
                                    {idx === 0 && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ec5b13]"></div>}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 pl-8">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl text-[13px] font-black text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
                                <IconFilter />
                                Filter
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl text-[13px] font-black text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
                                <IconExport />
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.03)] overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="px-8 py-5 w-12"><input type="checkbox" className="rounded border-slate-300 text-[#ec5b13] focus:ring-[#ec5b13]" /></th>
                                    <th className="px-6 py-5">Reference</th>
                                    <th className="px-6 py-5">Partner</th>
                                    <th className="px-6 py-5">Scheduled Date</th>
                                    <th className="px-6 py-5">Source Document</th>
                                    <th className="px-6 py-5">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="px-10 py-20 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-10 h-10 border-4 border-orange-100 border-t-[#ec5b13] rounded-full animate-spin"></div>
                                                <p className="text-[14px] font-bold text-slate-400">Loading receipts...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan={7} className="px-10 py-20 text-center">
                                            <p className="text-red-400 font-bold">{error}</p>
                                        </td>
                                    </tr>
                                ) : list.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-10 py-20 text-center">
                                            <p className="text-slate-400 font-bold">No receipts found.</p>
                                        </td>
                                    </tr>
                                ) : list.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5"><input type="checkbox" className="rounded border-slate-300 text-[#ec5b13] focus:ring-[#ec5b13]" /></td>
                                        <td className="px-6 py-5 text-[14px] font-black">
                                            <Link href={`/dashboard/receipts/${row.id}`} className="text-[#ec5b13] hover:underline">
                                                R#{row.id.toString().padStart(5, '0')}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-5 text-[14px] font-bold text-slate-600">{row.supplier_name}</td>
                                        <td className="px-6 py-5 text-[14px] font-bold text-slate-400">
                                            {formatDisplayDate(row.schedule_date)}
                                        </td>
                                        <td className="px-6 py-5 text-[14px] font-bold text-slate-400 italic font-mono">
                                            {row.type}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider ${getStatusStyles(row.status)}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right text-slate-300 hover:text-slate-600 cursor-pointer">
                                            <IconMeatballs />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="px-8 py-6 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
                            <p className="text-[13px] font-bold text-slate-400">Showing <span className="text-slate-900">1</span> to <span className="text-slate-900">6</span> of <span className="text-slate-900">24</span> receipts</p>
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2 border border-slate-200 rounded-xl text-[13px] font-extrabold text-slate-400 hover:bg-white hover:text-slate-600 transition-all">Previous</button>
                                <button className="px-4 py-2 border border-slate-200 rounded-xl text-[13px] font-extrabold text-slate-900 bg-white shadow-sm hover:shadow-md transition-all">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Receipts;
