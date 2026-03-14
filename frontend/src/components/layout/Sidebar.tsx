"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    IconDashboard, 
    IconOperations, 
    IconStock, 
    IconHistory, 
    IconSettings, 
    IconChevronDown 
} from "./Icons";

const Sidebar = () => {
    return (
        <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30">
            <div className="p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-xl shadow-slate-200 border-2 border-slate-50 relative">
                    <Image
                        src="/logo.jpeg"
                        alt="FlowIMS Logo"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl font-black tracking-tight text-[#011f2b] leading-tight">FlowIMS</h1>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mt-0.5">Inventory</p>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto scrollbar-hide">
                <Link className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-[#ec5b13] text-white shadow-2xl shadow-orange-200 transition-all hover:scale-[1.02] active:scale-95" href="/dashboard">
                    <IconDashboard />
                    <span className="text-[14px] font-extrabold tracking-tight">Dashboard</span>
                </Link>

                <div className="pt-4">
                    <p className="px-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-300 mb-4 opacity-70">Inventory</p>
                    <div className="space-y-1">
                        <button className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 group transition-all">
                            <div className="flex items-center gap-4">
                                <div className="text-slate-400 group-hover:text-[#ec5b13] transition-colors"><IconOperations /></div>
                                <span className="text-[14px] font-bold">Operations</span>
                            </div>
                            <div className="text-slate-300"><IconChevronDown /></div>
                        </button>
                        <div className="pl-12 space-y-3 mt-2">
                            <Link className="block text-[13px] font-bold text-slate-400 hover:text-[#ec5b13] transition-colors cursor-pointer" href="#">Receipt</Link>
                            <Link className="block text-[13px] font-bold text-slate-400 hover:text-[#ec5b13] transition-colors cursor-pointer" href="#">Delivery</Link>
                            <Link className="block text-[13px] font-bold text-slate-400 hover:text-[#ec5b13] transition-colors cursor-pointer" href="#">Adjustment</Link>
                        </div>
                    </div>
                </div>

                <Link className="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 group transition-all" href="#">
                    <div className="text-slate-400 group-hover:text-[#ec5b13]"><IconStock /></div>
                    <span className="text-[14px] font-bold">Stock</span>
                </Link>

                <Link className="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 group transition-all" href="#">
                    <div className="text-slate-400 group-hover:text-[#ec5b13]"><IconHistory /></div>
                    <span className="text-[14px] font-bold">Move History</span>
                </Link>

                <div className="pt-4">
                    <div className="space-y-1">
                        <button className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 group transition-all">
                            <div className="flex items-center gap-4">
                                <div className="text-slate-400 group-hover:text-[#ec5b13]"><IconSettings /></div>
                                <span className="text-[14px] font-bold">Settings</span>
                            </div>
                            <div className="text-slate-300"><IconChevronDown /></div>
                        </button>
                        <div className="pl-12 space-y-3 mt-2">
                            <Link className="block text-[13px] font-bold text-slate-400 hover:text-[#ec5b13] transition-colors cursor-pointer" href="#">Warehouse</Link>
                            <Link className="block text-[13px] font-bold text-slate-400 hover:text-[#ec5b13] transition-colors cursor-pointer" href="#">Locations</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
