"use client";

import React from "react";
import Link from "next/link";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import {
    IconChevronDown,
    IconPrinter,
    IconX,
    IconCheckCircle,
    IconCalendar
} from "../layout/Icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReceiptById, validateReceipt, clearCurrentReceipt } from "@/store/receiptSlice";
import { formatDisplayDate } from "@/lib/utils";

interface ReceiptDetailsProps {
    id: string;
}

const ReceiptDetails = ({ id }: ReceiptDetailsProps) => {
    const dispatch = useAppDispatch();
    const { currentReceipt, loading, error } = useAppSelector((state) => state.receipts);

    React.useEffect(() => {
        if (id) {
            dispatch(fetchReceiptById(parseInt(id)));
        }
        return () => {
            dispatch(clearCurrentReceipt());
        };
    }, [dispatch, id]);

    const handleValidate = async () => {
        if (currentReceipt) {
            await dispatch(validateReceipt(currentReceipt.id));
        }
    };

    if (loading && !currentReceipt) {
        return (
            <div className="flex min-h-screen bg-[#f8f6f6] font-display">
                <Sidebar />
                <main className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-orange-100 border-t-[#ec5b13] rounded-full animate-spin"></div>
                    <p className="mt-4 font-black text-slate-400">Loading receipt details...</p>
                </main>
            </div>
        );
    }

    if (error && !currentReceipt) {
        return (
            <div className="flex min-h-screen bg-[#f8f6f6] font-display">
                <Sidebar />
                <main className="flex-1 flex flex-col items-center justify-center px-10">
                    <p className="text-red-500 font-black text-xl">{error}</p>
                    <Link href="/dashboard/receipts" className="mt-6 bg-[#5c4ce3] text-white px-8 py-3 rounded-2xl font-black">
                        Back to Receipts
                    </Link>
                </main>
            </div>
        );
    }

    if (!currentReceipt) return null;

    const products = currentReceipt.products || [];

    return (
        <div className="flex min-h-screen bg-[#f8f6f6] font-display text-slate-900">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0">
                <Header />

                {/* Breadcrumbs & Title Area */}
                <div className="px-10 pt-8 flex items-center gap-2 text-[13px] font-bold text-slate-400">
                    <Link href="/dashboard/receipts" className="hover:text-slate-600 cursor-pointer">Operations</Link>
                    <IconChevronDown className="rotate-[-90deg] scale-75" />
                    <Link href="/dashboard/receipts" className="hover:text-slate-600 cursor-pointer">Receipts</Link>
                    <IconChevronDown className="rotate-[-90deg] scale-75" />
                    <span className="text-slate-900">{id || "WH/IN/0001"}</span>
                </div>

                <div className="px-10 pt-6 pb-10 flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black text-[#011f2b]">Receipt Details</h1>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                            <div className={`px-5 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all ${currentReceipt.status === 'Draft' ? 'bg-white text-[#5c4ce3] shadow-sm' : 'text-slate-400'}`}>Draft</div>
                            <div className={`px-5 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all ${currentReceipt.status === 'Ready' ? 'bg-white text-[#5c4ce3] shadow-sm' : 'text-slate-400'}`}>Ready</div>
                            <div className={`px-5 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all ${currentReceipt.status === 'Done' ? 'bg-white text-[#5c4ce3] shadow-sm' : 'text-slate-400'}`}>Done</div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        {currentReceipt.status !== 'Done' && (
                            <button
                                onClick={handleValidate}
                                disabled={loading}
                                className="bg-[#5c4ce3] hover:bg-[#4b3bd1] disabled:opacity-50 text-white px-6 py-3 rounded-2xl flex items-center gap-2 text-[14px] font-black shadow-lg shadow-indigo-100 transition-all active:scale-95"
                            >
                                <IconCheckCircle className="scale-75" />
                                {loading ? "Processing..." : "Validate"}
                            </button>
                        )}
                        <button className="bg-white border border-slate-100 hover:bg-slate-50 text-slate-600 px-6 py-3 rounded-2xl flex items-center gap-2 text-[14px] font-black shadow-sm transition-all active:scale-95">
                            <IconPrinter />
                            Print
                        </button>
                        <button className="bg-white border border-slate-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 text-slate-600 px-6 py-3 rounded-2xl flex items-center gap-2 text-[14px] font-black shadow-sm transition-all active:scale-95">
                            <IconX />
                            Cancel
                        </button>
                    </div>

                    {/* Info Card */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.03)] p-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="space-y-3">
                            <label className="text-[13px] font-black text-slate-500 uppercase tracking-wider ml-1">Receipt Reference</label>
                            <div className="w-full px-5 py-4 bg-slate-50/50 rounded-2xl text-[15px] font-bold text-slate-500 border border-slate-50">
                                {id || "WH/IN/0001"}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[13px] font-black text-slate-500 uppercase tracking-wider ml-1">Scheduled Date</label>
                            <div className="relative group">
                                <div className="w-full px-5 py-4 bg-slate-50/50 rounded-2xl text-[15px] font-bold text-slate-500 border border-slate-50 flex items-center justify-between">
                                    <span>{formatDisplayDate(currentReceipt.schedule_date)}</span>
                                    <IconCalendar className="text-slate-300" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[13px] font-black text-slate-500 uppercase tracking-wider ml-1">Receive From (Supplier)</label>
                            <div className="relative group">
                                <div className="w-full px-5 py-4 bg-slate-50/50 rounded-2xl text-[15px] font-bold text-slate-500 border border-slate-50 flex items-center justify-between">
                                    <span>{currentReceipt.supplier_name}</span>
                                    <IconChevronDown className="text-slate-300" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[13px] font-black text-slate-500 uppercase tracking-wider ml-1">Responsible</label>
                            <div className="relative group">
                                <div className="w-full px-5 py-4 bg-slate-50/50 rounded-2xl text-[15px] font-bold text-slate-500 border border-slate-50 flex items-center justify-between">
                                    <span>User ID: {currentReceipt.responsible_user}</span>
                                    <IconChevronDown className="text-slate-300" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.03)] overflow-hidden">
                        <div className="px-10 py-6 border-b border-slate-50 flex items-center justify-between">
                            <h2 className="text-[13px] font-black text-slate-500 uppercase tracking-wider">Products</h2>
                            <p className="text-[12px] font-bold text-slate-300">3 Items Expected</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 text-[11px] font-black text-slate-300 uppercase tracking-widest">
                                    <tr>
                                        <th className="px-10 py-5">Product</th>
                                        <th className="px-6 py-5 w-40">Expected Qty</th>
                                        <th className="px-6 py-5 w-40">Received Qty</th>
                                        <th className="px-10 py-5 w-40 text-right">UOM</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {products.map((product: any, idx) => (
                                        <tr key={idx} className="group transition-colors">
                                            <td className="px-10 py-6 text-[15px] font-black text-slate-700">Product #{product.product_id}</td>
                                            <td className="px-6 py-6">
                                                <div className="w-24 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[14px] font-bold text-slate-400">
                                                    {product.quantity}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="w-24 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[14px] font-bold text-slate-400">
                                                    {currentReceipt.status === 'Done' ? product.quantity : 0}
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-right text-[14px] font-bold text-slate-400">
                                                {product.warehouse_code} / {product.location_code}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-10 py-6 bg-slate-50/20">
                            <p className="text-[12px] font-bold text-slate-400 italic">This document is in read-only mode.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ReceiptDetails;
