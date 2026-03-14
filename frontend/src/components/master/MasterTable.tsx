"use client";

import React from "react";
import { 
    IconSearch, 
    IconTrendingUp, 
    IconTrendingDown 
} from "../layout/Icons";

interface Column {
    header: string;
    accessor: string;
    render?: (item: any) => React.ReactNode;
}

interface MasterTableProps {
    title: string;
    columns: Column[];
    data: any[];
    onEdit: (item: any) => void;
    onDelete: (id: any) => void;
    onAdd: () => void;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    isLoading?: boolean;
}

const MasterTable: React.FC<MasterTableProps> = ({
    title,
    columns,
    data,
    onEdit,
    onDelete,
    onAdd,
    searchTerm,
    onSearchChange,
    isLoading = false
}) => {
    return (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-50">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
                    <p className="text-slate-400 text-[14px] font-bold mt-1">Manage your system masters efficiently</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#ec5b13] transition-colors">
                            <IconSearch />
                        </div>
                        <input
                            type="text"
                            placeholder="Quick search..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-[14px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 placeholder:text-slate-300 transition-all outline-none w-64 shadow-inner"
                        />
                    </div>
                    
                    <button 
                        onClick={onAdd}
                        className="px-8 py-3.5 bg-[#ec5b13] text-white rounded-2xl font-black text-[14px] shadow-xl shadow-orange-200 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        + Add New
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50">
                            {columns.map((col, idx) => (
                                <th key={idx} className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-50">
                                    {col.header}
                                </th>
                            ))}
                            <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-50 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {isLoading ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-10 py-20 text-center text-slate-400 font-bold">
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-6 h-6 border-4 border-orange-100 border-t-[#ec5b13] rounded-full animate-spin"></div>
                                        <span>Loading masters...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-10 py-20 text-center text-slate-400 font-bold">
                                    No records found matching your criteria.
                                </td>
                            </tr>
                        ) : (
                            data.map((item, idx) => (
                                <tr key={item.id || idx} className="hover:bg-slate-50/30 transition-colors group">
                                    {columns.map((col, cIdx) => (
                                        <td key={cIdx} className="px-10 py-6 text-[15px] font-bold text-slate-600 border-b border-slate-50/50">
                                            {col.render ? col.render(item) : item[col.accessor]}
                                        </td>
                                    ))}
                                    <td className="px-10 py-6 text-right border-b border-slate-50/50">
                                        <div className="flex items-center justify-end gap-3 transition-opacity">
                                            <button 
                                                onClick={() => onEdit(item)}
                                                className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all font-black text-xs uppercase tracking-wider shadow-sm"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => onDelete(item.id)}
                                                className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-black text-xs uppercase tracking-wider shadow-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="p-8 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between text-slate-400 font-bold text-xs uppercase tracking-wider">
                <span>Showing {data.length} records</span>
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-white border border-slate-100 rounded-xl hover:border-orange-200 transition-all shadow-sm active:scale-95 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-4 py-2 bg-white border border-slate-100 rounded-xl hover:border-orange-200 transition-all shadow-sm active:scale-95 disabled:opacity-50" disabled>Next</button>
                </div>
            </div>
        </div>
    );
};

export default MasterTable;
