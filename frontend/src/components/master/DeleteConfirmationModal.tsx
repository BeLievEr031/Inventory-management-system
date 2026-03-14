"use client";

import React from "react";
import { IconAlertCircle } from "../layout/Icons";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    isLoading?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Deletion",
    message = "Are you sure you want to delete this record? This action cannot be undone.",
    isLoading = false
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300" 
                onClick={onClose}
            ></div>
            
            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl shadow-slate-900/20 overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-10 text-center">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 scale-110">
                        <IconAlertCircle />
                    </div>
                    
                    <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{title}</h3>
                    <p className="text-slate-500 font-bold leading-relaxed px-4 italic">
                        {message}
                    </p>
                </div>
                
                <div className="p-8 bg-slate-50/50 flex gap-4 border-t border-slate-100">
                    <button 
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black text-[14px] hover:bg-slate-50 active:scale-95 transition-all outline-none disabled:opacity-50"
                    >
                        CANCEL
                    </button>
                    <button 
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black text-[14px] shadow-lg shadow-red-200 hover:bg-red-600 active:scale-95 transition-all outline-none flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-3 border-red-200 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            "DELETE NOW"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
