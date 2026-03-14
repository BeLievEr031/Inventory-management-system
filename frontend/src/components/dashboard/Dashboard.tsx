"use client";

import React from "react";
import Image from "next/image";

// --- Robust SVG Icons ---
const IconDashboard = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
);
const IconOperations = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
);
const IconStock = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path d="M22 7h-5c-1 0-1.1.2-2 1l-2 2c-.8.8-1.3 1-2 1s-1.2-.2-2-1l-2-2c-.9-.8-1-1-2-1H2" /></svg>
);
const IconHistory = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg>
);
const IconSettings = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
);
const IconChevronDown = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
);
const IconSearch = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
);
const IconNotification = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
);
const IconTrendingUp = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
);
const IconTrendingDown = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" /></svg>
);
const IconInventory = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z" /><path d="M3 9h18" /><path d="M9 21V9" /><path d="M3 15h18" /></svg>
);
const IconReceipt = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 17.5V6.5" /></svg>
);
const IconShipping = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3" /><circle cx="7" cy="17" r="2" /><path d="M17 17h5l-1.5-6H14v6" /><circle cx="17" cy="17" r="2" /></svg>
);
const IconRefresh = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M21 21v-5h-5" /></svg>
);
const IconWarning = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
);

const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-[#f8f6f6] font-display text-slate-900">
            {/* Sidebar Navigation */}
            <aside className="w-72 flex-shrink-0 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30">
                <div className="p-10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-xl shadow-slate-200 border-2 border-slate-50 relative">
                        <Image
                            src="/logo.jpeg"
                            alt="FlowIMS Logo"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-black tracking-tight text-[#011f2b] leading-tight">FlowIMS</h1>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mt-0.5">Intelligent Suite</p>
                    </div>
                </div>

                <nav className="flex-1 px-6 space-y-2 mt-4 overflow-y-auto scrollbar-hide">
                    <a className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#ec5b13] text-white shadow-2xl shadow-orange-200 transition-all hover:scale-[1.02] active:scale-95" href="#">
                        <IconDashboard />
                        <span className="text-[15px] font-extrabold tracking-tight">Dashboard</span>
                    </a>

                    <div className="pt-8">
                        <p className="px-5 text-[11px] font-black uppercase tracking-[0.15em] text-slate-300 mb-4 opacity-70">Inventory</p>
                        <div className="space-y-1">
                            <button className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-slate-500 hover:bg-slate-50 group transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="text-slate-400 group-hover:text-[#ec5b13] transition-colors"><IconOperations /></div>
                                    <span className="text-[15px] font-bold">Operations</span>
                                </div>
                                <div className="text-slate-300"><IconChevronDown /></div>
                            </button>
                            <div className="pl-14 space-y-4 mt-3">
                                <a className="block text-[14px] font-bold text-slate-400 hover:text-[#ec5b13] transition-colors cursor-pointer" href="#">Receipt</a>
                                <a className="block text-[14px] font-bold text-slate-400 hover:text-[#ec5b13] transition-colors cursor-pointer" href="#">Delivery</a>
                                <a className="block text-[14px] font-bold text-slate-400 hover:text-[#ec5b13] transition-colors cursor-pointer" href="#">Adjustment</a>
                            </div>
                        </div>
                    </div>

                    <a className="flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-500 hover:bg-slate-50 group transition-all" href="#">
                        <div className="text-slate-400 group-hover:text-[#ec5b13]"><IconStock /></div>
                        <span className="text-[15px] font-bold">Stock</span>
                    </a>

                    <a className="flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-500 hover:bg-slate-50 group transition-all" href="#">
                        <div className="text-slate-400 group-hover:text-[#ec5b13]"><IconHistory /></div>
                        <span className="text-[15px] font-bold">Move History</span>
                    </a>

                    <div className="pt-8">
                        <div className="space-y-1">
                            <button className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-slate-500 hover:bg-slate-50 group transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="text-slate-400 group-hover:text-[#ec5b13]"><IconSettings /></div>
                                    <span className="text-[15px] font-bold">Settings</span>
                                </div>
                                <div className="text-slate-300"><IconChevronDown /></div>
                            </button>
                            <div className="pl-14 space-y-4 mt-3">
                                <a className="block text-[14px] font-bold text-slate-400 hover:text-[#ec5b13] transition-colors cursor-pointer" href="#">Warehouse</a>
                                <a className="block text-[14px] font-bold text-slate-400 hover:text-[#ec5b13] transition-colors cursor-pointer" href="#">Locations</a>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="p-6 mt-auto">
                    <div className="p-6 rounded-[2rem] bg-orange-50/50 border border-orange-100/50 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                            <IconWarning />
                        </div>
                        <p className="text-[11px] font-black text-[#ec5b13] uppercase tracking-widest mb-2">Storage Alert</p>
                        <p className="text-[13px] font-bold text-slate-600 mb-5 leading-tight">Warehouse A is at 92% capacity.</p>
                        <div className="w-full bg-slate-200/50 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-[#ec5b13] h-full w-[92%] rounded-full shadow-[0_0_12px_rgba(236,91,19,0.4)] animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#f8f6f6]">
                {/* Header */}
                <header className="h-[88px] flex items-center justify-between px-12 bg-white/80 backdrop-blur-md border-b border-slate-100/50 sticky top-0 z-20">
                    <div className="flex items-center gap-8 flex-1">
                        <div className="relative w-full max-w-xl group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#ec5b13] transition-colors">
                                <IconSearch />
                            </div>
                            <input
                                className="w-full pl-14 pr-7 py-4 bg-slate-50 border-none rounded-[1.25rem] text-[15px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 placeholder:text-slate-300 outline-none transition-all shadow-inner"
                                placeholder="Search inventory, SKU, or moves..."
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                        <button className="p-3 text-slate-400 hover:text-[#ec5b13] hover:bg-orange-50 rounded-2xl relative transition-all active:scale-95 group">
                            <IconNotification />
                            <span className="absolute top-3 right-3 w-3 h-3 bg-[#ec5b13] rounded-full border-2 border-white group-hover:scale-125 transition-transform"></span>
                        </button>
                        <div className="h-10 w-[1.5px] bg-slate-100 opacity-60"></div>
                        <div className="flex items-center gap-5 group cursor-pointer">
                            <div className="text-right hidden md:block">
                                <p className="text-[15px] font-black text-slate-900 leading-none">Alex Rivera</p>
                                <p className="text-[12px] font-extrabold text-slate-400 mt-2 leading-none">Warehouse Mgr.</p>
                            </div>
                            <div className="w-14 h-14 rounded-[1.5rem] bg-slate-100 border-2 border-slate-50 overflow-hidden shadow-lg transition-all group-hover:ring-4 ring-orange-100 ring-opacity-50">
                                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-400 flex items-center justify-center text-white">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-12 space-y-12">
                    {/* KPI Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
                        {/* Total Inventory */}
                        <div className="bg-white p-9 rounded-[2.5rem] border border-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.06)] transition-all group relative overflow-hidden">
                            <div className="flex items-center justify-between mb-8 relative z-10">
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
                        <div className="bg-white p-9 rounded-[2.5rem] border border-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.06)] transition-all group relative overflow-hidden">
                            <div className="flex items-center justify-between mb-8 relative z-10">
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
                        <div className="bg-white p-9 rounded-[2.5rem] border border-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.06)] transition-all group relative overflow-hidden">
                            <div className="flex items-center justify-between mb-8 relative z-10">
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
                        <div className="bg-white p-9 rounded-[2.5rem] border border-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.06)] transition-all group relative overflow-hidden">
                            <div className="flex items-center justify-between mb-8 relative z-10">
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
