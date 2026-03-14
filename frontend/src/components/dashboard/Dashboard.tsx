"use client";

import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { 
    IconInventory, 
    IconTrendingUp, 
    IconReceipt, 
    IconShipping, 
    IconTrendingDown, 
    IconRefresh 
} from "../layout/Icons";

const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-[#f8f6f6] font-display text-slate-900">
            {/* Sidebar Navigation */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#f8f6f6]">
                {/* Header */}
                <Header />

                {/* Dashboard Content */}
                <div className="p-8 space-y-8">
                    {/* KPI Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {/* Total Inventory */}
                        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.06)] transition-all group relative overflow-hidden">
                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <div className="p-4 bg-orange-50/70 text-[#ec5b13] rounded-2xl group-hover:rotate-12 transition-transform shadow-sm">
                                    <IconInventory />
                                </div>
                                <div className="text-green-500 text-[14px] font-black flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full shadow-sm">
                                    <IconTrendingUp /> +12.5%
                                </div>
                            </div>
                            <p className="text-slate-400 text-[15px] font-black tracking-tight relative z-10">Total Inventory</p>
                            <h3 className="text-4xl font-black mt-3 text-slate-900 tracking-tight relative z-10">14,284</h3>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-50/40 rounded-full blur-3xl group-hover:bg-orange-50/60 transition-colors"></div>
                        </div>

                        {/* Active Receipts */}
                        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.06)] transition-all group relative overflow-hidden">
                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <div className="p-4 bg-blue-50/70 text-blue-600 rounded-2xl group-hover:rotate-12 transition-transform shadow-sm">
                                    <IconReceipt />
                                </div>
                                <div className="text-green-500 text-[14px] font-black flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full shadow-sm">
                                    <IconTrendingUp /> +4%
                                </div>
                            </div>
                            <p className="text-slate-400 text-[15px] font-black tracking-tight relative z-10">Active Receipts</p>
                            <h3 className="text-4xl font-black mt-3 text-slate-900 tracking-tight relative z-10">58</h3>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50/40 rounded-full blur-3xl group-hover:bg-blue-50/60 transition-colors"></div>
                        </div>

                        {/* Pending Deliveries */}
                        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.06)] transition-all group relative overflow-hidden">
                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <div className="p-4 bg-amber-50/70 text-amber-600 rounded-2xl group-hover:rotate-12 transition-transform shadow-sm">
                                    <IconShipping />
                                </div>
                                <div className="text-red-500 text-[14px] font-black flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full shadow-sm">
                                    <IconTrendingDown /> -2%
                                </div>
                            </div>
                            <p className="text-slate-400 text-[15px] font-black tracking-tight relative z-10">Pending Deliveries</p>
                            <h3 className="text-4xl font-black mt-3 text-slate-900 tracking-tight relative z-10">21</h3>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-50/40 rounded-full blur-3xl group-hover:bg-amber-50/60 transition-colors"></div>
                        </div>

                        {/* Stock Turnover */}
                        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.06)] transition-all group relative overflow-hidden">
                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <div className="p-4 bg-purple-50/70 text-purple-600 rounded-2xl group-hover:rotate-12 transition-transform shadow-sm">
                                    <IconRefresh />
                                </div>
                                <div className="text-green-500 text-[14px] font-black flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full shadow-sm">
                                    <IconTrendingUp /> +0.8%
                                </div>
                            </div>
                            <p className="text-slate-400 text-[15px] font-black tracking-tight relative z-10">Stock Turnover</p>
                            <h3 className="text-4xl font-black mt-3 text-slate-900 tracking-tight relative z-10">8.2x</h3>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-50/40 rounded-full blur-3xl group-hover:bg-purple-50/60 transition-colors"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
