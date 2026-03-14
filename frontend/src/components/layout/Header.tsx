"use client";

import React, { useState, useEffect } from "react";
import { IconSearch, IconUser, IconLogout } from "./Icons";
import { useRouter } from "next/navigation";

const Header = () => {
    const [user, setUser] = useState<any>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
            }
        }

        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.profile-menu-container')) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            router.push("/login");
        }
    };

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
                <div className="relative profile-menu-container">
                    <div 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-5 group cursor-pointer"
                    >
                        <div className="text-right hidden md:block">
                            <p className="text-[15px] font-black text-slate-900 leading-none">{user?.login_id || "User"}</p>
                        </div>
                        <div className="w-14 h-14 rounded-[1.5rem] bg-slate-100 border-2 border-slate-50 overflow-hidden shadow-lg transition-all group-hover:ring-4 ring-orange-100 ring-opacity-50 relative">
                            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-400 flex items-center justify-center text-white">
                                <IconUser />
                            </div>
                        </div>
                    </div>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 animate-in fade-in zoom-in duration-200 z-50">
                            <div className="px-4 py-3 border-b border-slate-50 mb-1">
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Signed in as</p>
                                <p className="text-[14px] font-black text-slate-900 truncate">{user?.login_id || "User"}</p>
                            </div>
                            
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-red-500 hover:bg-red-50 transition-colors group"
                            >
                                <div className="text-slate-300 group-hover:text-red-500 transition-colors">
                                    <IconLogout />
                                </div>
                                <span className="text-[14px] font-extrabold uppercase tracking-tight">Logout Session</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
