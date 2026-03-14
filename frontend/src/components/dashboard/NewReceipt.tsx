"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import {
    IconChevronDown,
    IconPlus,
    IconTrash,
    IconCalendar,
    IconCheckCircle
} from "../layout/Icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts, fetchWarehouses, fetchLocationsByWarehouse } from "@/store/metadataSlice";
import { createReceipt } from "@/store/receiptSlice";
import { useRouter } from "next/navigation";

const NewReceipt = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { products: availableProducts, warehouses, locations } = useAppSelector(state => state.metadata);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        supplier_name: "",
        schedule_date: "",
        responsible_user: 1, // Default for now
    });

    const [selectedProducts, setSelectedProducts] = useState<any[]>([
        { product_id: "", quantity: 1, warehouse_code: "", location_code: "" }
    ]);

    React.useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchWarehouses());
    }, [dispatch]);

    const handleAddProduct = () => {
        setSelectedProducts([...selectedProducts, { product_id: "", quantity: 1, warehouse_code: "", location_code: "" }]);
    };

    const handleRemoveProduct = (index: number) => {
        setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
    };

    const handleProductChange = (index: number, field: string, value: any) => {
        const updated = [...selectedProducts];
        updated[index][field] = value;

        if (field === "warehouse_code") {
            dispatch(fetchLocationsByWarehouse(value));
        }

        setSelectedProducts(updated);
    };

    const handleSubmit = async () => {
        if (!formData.supplier_name || !formData.schedule_date || selectedProducts.some(p => !p.product_id)) {
            alert("Please fill all required fields and add at least one valid product.");
            return;
        }

        setLoading(true);
        try {
            const result = await dispatch(createReceipt({
                ...formData,
                products: selectedProducts.map(p => ({
                    ...p,
                    product_id: parseInt(p.product_id),
                    quantity: parseInt(p.quantity)
                }))
            })).unwrap();
            router.push(`/dashboard/receipts/${result.id}`);
        } catch (err: any) {
            alert(err || "Failed to create receipt");
        } finally {
            setLoading(false);
        }
    };

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
                    <span className="text-slate-900">New</span>
                </div>

                <div className="px-10 pt-6 pb-10 flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black text-[#011f2b]">New Receipt</h1>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                            <button className="px-5 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg bg-white text-[#ec5b13] shadow-sm">Draft</button>
                            <button className="px-5 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg text-slate-400 hover:text-slate-600">Ready</button>
                            <button className="px-5 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg text-slate-400 hover:text-slate-600">Done</button>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.03)] p-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {/* Receipt Reference */}
                        <div className="space-y-3">
                            <label className="text-[13px] font-black text-slate-500 uppercase tracking-wider ml-1">Receipt Reference</label>
                            <div className="relative">
                                <input
                                    className="w-full pl-5 pr-5 py-4 bg-slate-50 border-none rounded-2xl text-[15px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 placeholder:text-slate-300 outline-none transition-all"
                                    type="text"
                                    defaultValue="WH/IN/0001"
                                />
                            </div>
                        </div>

                        {/* Scheduled Date */}
                        <div className="space-y-3">
                            <label className="text-[13px] font-black text-slate-500 uppercase tracking-wider ml-1">Scheduled Date</label>
                            <div className="relative group">
                                <input
                                    className="w-full pl-5 pr-12 py-4 bg-slate-50 border-none rounded-2xl text-[15px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 placeholder:text-slate-300 outline-none transition-all cursor-pointer"
                                    type="date"
                                    onChange={(e) => setFormData({ ...formData, schedule_date: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Supplier */}
                        <div className="space-y-3">
                            <label className="text-[13px] font-black text-slate-500 uppercase tracking-wider ml-1">Receive From (Supplier)</label>
                            <div className="relative group">
                                <input
                                    className="w-full pl-5 pr-5 py-4 bg-slate-50 border-none rounded-2xl text-[15px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 placeholder:text-slate-300 outline-none transition-all"
                                    placeholder="Enter supplier name..."
                                    onChange={(e) => setFormData({ ...formData, supplier_name: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Responsible */}
                        <div className="space-y-3">
                            <label className="text-[13px] font-black text-slate-500 uppercase tracking-wider ml-1">Responsible</label>
                            <div className="relative group">
                                <select
                                    disabled
                                    className="w-full pl-5 pr-12 py-4 bg-slate-200 border-none rounded-2xl text-[15px] font-bold text-slate-500 outline-none appearance-none cursor-not-allowed"
                                >
                                    <option value="1">Current User</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.03)] overflow-hidden">
                        <div className="px-10 py-6 border-b border-slate-50 flex items-center justify-between">
                            <h2 className="text-[13px] font-black text-slate-500 uppercase tracking-wider">Products</h2>
                            <p className="text-[12px] font-bold text-slate-300">{products.length} Items Expected</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[800px]">
                                <thead className="bg-slate-50/50 text-[11px] font-black text-slate-300 uppercase tracking-widest">
                                    <tr>
                                        <th className="px-10 py-5">Product</th>
                                        <th className="px-6 py-5">Warehouse</th>
                                        <th className="px-6 py-5">Location</th>
                                        <th className="px-6 py-5 w-40">Expected Qty</th>
                                        <th className="px-10 py-5 w-20"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {selectedProducts.map((p, idx) => (
                                        <tr key={idx} className="group transition-colors">
                                            <td className="px-10 py-6">
                                                <select
                                                    className="w-full bg-slate-50 border-none rounded-xl text-[14px] font-bold p-3 outline-none"
                                                    value={p.product_id}
                                                    onChange={(e) => handleProductChange(idx, "product_id", e.target.value)}
                                                >
                                                    <option value="">Select product...</option>
                                                    {availableProducts.map(prod => <option key={prod.id} value={prod.id}>{prod.name}</option>)}
                                                </select>
                                            </td>
                                            <td className="px-6 py-6">
                                                <select
                                                    className="w-full bg-slate-50 border-none rounded-xl text-[14px] font-bold p-3 outline-none"
                                                    value={p.warehouse_code}
                                                    onChange={(e) => handleProductChange(idx, "warehouse_code", e.target.value)}
                                                >
                                                    <option value="">Select...</option>
                                                    {warehouses.map(w => <option key={w.code} value={w.code}>{w.name}</option>)}
                                                </select>
                                            </td>
                                            <td className="px-6 py-6">
                                                <select
                                                    className="w-full bg-slate-50 border-none rounded-xl text-[14px] font-bold p-3 outline-none"
                                                    value={p.location_code}
                                                    onChange={(e) => handleProductChange(idx, "location_code", e.target.value)}
                                                >
                                                    <option value="">Select...</option>
                                                    {locations.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                                                </select>
                                            </td>
                                            <td className="px-6 py-6">
                                                <input
                                                    className="w-24 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[14px] font-bold focus:ring-2 focus:ring-orange-100 outline-none"
                                                    type="number"
                                                    value={p.quantity}
                                                    onChange={(e) => handleProductChange(idx, "quantity", e.target.value)}
                                                />
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <button
                                                    onClick={() => handleRemoveProduct(idx)}
                                                    className="p-2 text-slate-200 hover:text-red-400 hover:bg-red-50 rounded-lg transition-all active:scale-90"
                                                >
                                                    <IconTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-10 py-6 bg-slate-50/20">
                            <button
                                onClick={handleAddProduct}
                                className="flex items-center gap-2 text-[14px] font-black text-[#ec5b13] hover:text-[#d44d0e] transition-all"
                            >
                                <IconPlus />
                                Add Product
                            </button>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-[#5c4ce3] hover:bg-[#4b3bd1] disabled:opacity-50 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black shadow-xl shadow-indigo-100 transition-all active:scale-95"
                        >
                            <IconCheckCircle />
                            {loading ? "Creating..." : "Create Receipt"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NewReceipt;
