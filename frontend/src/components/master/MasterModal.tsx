"use client";

import React from "react";

interface MasterModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    onSubmit: () => void;
    isLoading?: boolean;
    submitLabel?: string;
}

const MasterModal: React.FC<MasterModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    onSubmit,
    isLoading = false,
    submitLabel = "Save Changes"
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
                onClick={onClose}
            ></div>
            
            <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/20 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
                <div className="p-10 border-b border-slate-50">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
                    <p className="text-slate-400 text-[14px] font-bold mt-1">Please fill in the details correctly</p>
                </div>
                
                <div className="p-10 space-y-6">
                    {children}
                </div>
                
                <div className="p-10 bg-slate-50/50 flex items-center justify-end gap-5">
                    <button
                        onClick={onClose}
                        className="px-8 py-3.5 bg-white border border-slate-200 text-slate-500 rounded-2xl font-black text-[14px] hover:bg-slate-50 transition-all active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={isLoading}
                        className="px-8 py-3.5 bg-[#ec5b13] text-white rounded-2xl font-black text-[14px] shadow-xl shadow-orange-200 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center gap-3"
                    >
                        {isLoading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                        {submitLabel}
                    </button>
                </div>

                <button 
                    onClick={onClose}
                    className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors bg-slate-50/50 hover:bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center shadow-inner"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
            </div>
        </div>
    );
};

export default MasterModal;
