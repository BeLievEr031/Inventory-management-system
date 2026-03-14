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
import { usePathname } from "next/navigation";
import { 
    IconDashboard, 
    IconOperations, 
    IconStock, 
    IconHistory, 
    IconSettings, 
    IconChevronDown 
} from "./Icons";

const Sidebar = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;
    const isParentActive = (paths: string[]) => paths.some(path => pathname.startsWith(path));

    const mainLinkClass = (path: string) => `
        flex items-center gap-4 px-4 py-3 rounded-2xl transition-all hover:scale-[1.02] active:scale-95
        ${isActive(path) 
            ? "bg-[#ec5b13] text-white shadow-2xl shadow-orange-200" 
            : "text-slate-500 hover:bg-slate-50 group"}
    `;

    const subLinkClass = (path: string) => `
        block text-[13px] font-bold transition-colors cursor-pointer
        ${isActive(path) ? "text-[#ec5b13]" : "text-slate-400 hover:text-[#ec5b13]"}
    `;

    const iconClass = (path: string) => `
        transition-colors
        ${isActive(path) ? "text-white" : "text-slate-400 group-hover:text-[#ec5b13]"}
    `;

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
                <Link className={mainLinkClass("/dashboard")} href="/dashboard">
                    <div className={pathname === "/dashboard" ? "text-white" : "text-slate-400"}><IconDashboard /></div>
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
                            <Link className="block text-[13px] font-bold text-slate-400 hover:text-[#ec5b13] transition-colors cursor-pointer" href="/dashboard/receipts">Receipt</Link>
                            <Link className="block text-[13px] font-bold text-slate-400 hover:text-[#ec5b13] transition-colors cursor-pointer" href="#">Delivery</Link>
                            <Link className="block text-[13px] font-bold text-slate-400 hover:text-[#ec5b13] transition-colors cursor-pointer" href="#">Adjustment</Link>
                            <Link className={subLinkClass("#")} href="#">Receipt</Link>
                            <Link className={subLinkClass("#")} href="#">Delivery</Link>
                            <Link className={subLinkClass("#")} href="#">Adjustment</Link>
                        </div>
                    </div>
                </div>

                <Link className={mainLinkClass("/dashboard/products")} href="/dashboard/products">
                    <div className={iconClass("/dashboard/products")}><IconStock /></div>
                    <span className="text-[14px] font-bold">Stock</span>
                </Link>

                <Link className={mainLinkClass("#")} href="#">
                    <div className={iconClass("#")}><IconHistory /></div>
                    <span className="text-[14px] font-bold">Move History</span>
                </Link>

                <div className="pt-4">
                    <div className="space-y-1">
                        <button className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${isParentActive(["/dashboard/warehouses", "/dashboard/locations"]) ? "bg-slate-50 text-[#ec5b13]" : "text-slate-500 hover:bg-slate-50 group"}`}>
                            <div className="flex items-center gap-4">
                                <div className={isParentActive(["/dashboard/warehouses", "/dashboard/locations"]) ? "text-[#ec5b13]" : "text-slate-400 group-hover:text-[#ec5b13]"}><IconSettings /></div>
                                <span className="text-[14px] font-bold">Settings</span>
                            </div>
                            <div className="text-slate-300"><IconChevronDown /></div>
                        </button>
                        <div className="pl-12 space-y-3 mt-2">
                            <Link className={subLinkClass("/dashboard/warehouses")} href="/dashboard/warehouses">Warehouse</Link>
                            <Link className={subLinkClass("/dashboard/locations")} href="/dashboard/locations">Locations</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
