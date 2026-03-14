"use client";

import React from "react";
import { IconSearch, IconNotification, IconUser } from "./Icons";

const Header = () => {
    return (
        <header className="h-16 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-slate-100/50 sticky top-0 z-20">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-full max-w-md group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#ec5b13] transition-colors">
                        <IconSearch />
                    </div>
                    <input
                        className="w-full pl-12 pr-6 py-2.5 bg-slate-50 border-none rounded-[1rem] text-[14px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 placeholder:text-slate-300 outline-none transition-all shadow-inner"
                        placeholder="Search inventory, SKU, or moves..."
                        type="text"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
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
                            <IconUser />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
