"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MasterTable from "@/components/master/MasterTable";
import MasterModal from "@/components/master/MasterModal";
import DeleteConfirmationModal from "@/components/master/DeleteConfirmationModal";
import api from "@/lib/api";

const ProductManagement = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [warehouses, setWarehouses] = useState<any[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ 
        name: "", 
        sku: "", 
        category: "", 
        warehouse_code: "",
        location_code: "",
        quantity: 0
    });
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [prodRes, whRes, locRes] = await Promise.allSettled([
                api.get("/products"),
                api.get("/warehouses"),
                api.get("/locations")
            ]);

            if (prodRes.status === 'fulfilled') setProducts(prodRes.value.data?.data || []);
            if (whRes.status === 'fulfilled') setWarehouses(whRes.value.data?.data || []);
            if (locRes.status === 'fulfilled') setLocations(locRes.value.data?.data || []);
            
            if (prodRes.status === 'rejected' || whRes.status === 'rejected' || locRes.status === 'rejected') {
                console.error("Some data failed to fetch", { prodRes, whRes, locRes });
            }
        } catch (err: any) {
            console.error("Failed to fetch data", err);
            setError("Failed to load component data. Please try refreshing.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = products.filter((item: any) => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        setCurrentProduct({ 
            name: "", 
            sku: "", 
            category: "", 
            warehouse_code: warehouses[0]?.code || "",
            location_code: "",
            quantity: 0
        });
        setIsEditing(false);
        setError("");
        setIsModalOpen(true);
    };

    // Auto-select warehouse and first location if adding new and warehouses are loaded
    useEffect(() => {
        if (!isEditing && isModalOpen && warehouses.length > 0 && !currentProduct.warehouse_code) {
            setCurrentProduct(prev => ({ ...prev, warehouse_code: warehouses[0].code }));
        }
    }, [isModalOpen, warehouses, isEditing]);

    // Auto-select first location when warehouse changes or locations load
    useEffect(() => {
        if (!isEditing && isModalOpen && currentProduct.warehouse_code) {
            const available = locations.filter(loc => loc.warehouse_code === currentProduct.warehouse_code);
            if (available.length > 0 && !currentProduct.location_code) {
                setCurrentProduct(prev => ({ ...prev, location_code: available[0].code }));
            }
        }
    }, [currentProduct.warehouse_code, locations, isModalOpen, isEditing]);

    const handleEdit = (item: any) => {
        setCurrentProduct(item);
        setIsEditing(true);
        setError("");
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setItemToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete === null) return;
        try {
            setFormLoading(true);
            await api.delete(`/products/${itemToDelete}`);
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
            fetchData();
        } catch (err: any) {
            alert(err.response?.data?.error?.message || "Failed to delete product");
        } finally {
            setFormLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!currentProduct.name || !currentProduct.sku || !currentProduct.category || !currentProduct.warehouse_code || !currentProduct.location_code) {
            setError("Please fill in all required fields.");
            return;
        }

        try {
            setFormLoading(true);
            setError("");
            if (isEditing) {
                await api.put(`/products/${(currentProduct as any).id}`, currentProduct);
            } else {
                await api.post("/products", currentProduct);
            }
            setIsModalOpen(false);
            fetchData();
        } catch (err: any) {
            setError(err.response?.data?.error?.message || "Something went wrong.");
        } finally {
            setFormLoading(false);
        }
    };

    const filteredLocations = locations.filter(loc => loc.warehouse_code === currentProduct.warehouse_code);

    const columns = [
        { header: "Product Name", accessor: "name" },
        { header: "SKU", accessor: "sku", render: (item: any) => <span className="font-mono text-xs font-black bg-slate-100 px-2 py-1 rounded-lg text-slate-500">{item.sku}</span> },
        { header: "Category", accessor: "category" },
        { header: "Stock", accessor: "quantity", render: (item: any) => (
            <div className="flex items-center gap-2">
                <span className={`text-[15px] font-black ${item.quantity > 0 ? 'text-teal-600' : 'text-red-500'}`}>
                    {item.quantity}
                </span>
            </div>
        )},
        { header: "Warehouse", accessor: "warehouse_code", render: (item: any) => (
            <span className="px-3 py-1 bg-orange-50 text-[#ec5b13] rounded-full text-[11px] font-black uppercase tracking-wider">
                {item.warehouse_code}
            </span>
        )},
        { header: "Location", accessor: "location_code" }
    ];

    return (
        <div className="flex min-h-screen bg-[#f8f6f6] font-display text-slate-900">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0">
                <Header />
                <div className="p-8">
                    <MasterTable 
                        title="Stock Management"
                        columns={columns}
                        data={filteredData}
                        onAdd={handleAdd}
                        onEdit={handleEdit}
                        onDelete={handleDeleteClick}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        isLoading={isLoading}
                    />
                </div>
            </main>

            <MasterModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEditing ? "Edit Product" : "Add New Product"}
                onSubmit={handleSubmit}
                isLoading={formLoading}
                submitLabel={isEditing ? "Update Product" : "Create Product"}
            >
                <div className="space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-[14px] font-bold border border-red-100 italic">
                            ⚠ {error}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2">Product Name</label>
                            <input 
                                type="text"
                                value={currentProduct.name}
                                onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                                placeholder="e.g. Wireless Mouse"
                                className="w-full px-7 py-4 bg-slate-50 border-none rounded-2xl text-[15px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 placeholder:text-slate-300 transition-all outline-none shadow-inner"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2">SKU Code</label>
                            <input 
                                type="text"
                                value={currentProduct.sku}
                                onChange={(e) => setCurrentProduct({...currentProduct, sku: e.target.value.toUpperCase()})}
                                placeholder="e.g. WM-001"
                                className="w-full px-7 py-4 bg-slate-50 border-none rounded-2xl text-[15px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 placeholder:text-slate-300 transition-all outline-none shadow-inner uppercase"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2">Category</label>
                            <input 
                                type="text"
                                value={currentProduct.category}
                                onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                                placeholder="e.g. Electronics"
                                className="w-full px-7 py-4 bg-slate-50 border-none rounded-2xl text-[15px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 placeholder:text-slate-300 transition-all outline-none shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2">Warehouse</label>
                            <div className="relative group/select">
                                <select 
                                    value={currentProduct.warehouse_code}
                                    onChange={(e) => setCurrentProduct({...currentProduct, warehouse_code: e.target.value, location_code: ""})}
                                    className="w-full px-7 py-4 bg-slate-50 border-none rounded-2xl text-[15px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 outline-none shadow-inner appearance-none cursor-pointer"
                                >
                                    <option value="">{warehouses.length === 0 ? "No Warehouses Found" : "Select Warehouse"}</option>
                                    {warehouses.map((wh: any) => (
                                        <option key={wh.id} value={wh.code}>{wh.name} ({wh.code})</option>
                                    ))}
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-hover/select:text-slate-400 transition-colors">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                            {warehouses.length === 0 && !isLoading && (
                                <p className="text-[10px] text-red-500 font-bold px-2">Please create a warehouse first in Settings.</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2">Location</label>
                            <div className="relative group/select">
                                <select 
                                    value={currentProduct.location_code}
                                    onChange={(e) => setCurrentProduct({...currentProduct, location_code: e.target.value})}
                                    disabled={!currentProduct.warehouse_code}
                                    className="w-full px-7 py-4 bg-slate-50 border-none rounded-2xl text-[15px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 outline-none shadow-inner appearance-none cursor-pointer disabled:opacity-50"
                                >
                                    <option value="">{!currentProduct.warehouse_code ? "Select Warehouse First" : filteredLocations.length === 0 ? "No Locations Found" : "Select Location"}</option>
                                    {filteredLocations.map((loc: any) => (
                                        <option key={loc.id} value={loc.code}>{loc.name} ({loc.code})</option>
                                    ))}
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-hover/select:text-slate-400 transition-colors">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                            {currentProduct.warehouse_code && filteredLocations.length === 0 && !isLoading && (
                                <p className="text-[10px] text-red-500 font-bold px-2">Please create a location for this warehouse in Settings.</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2">Initial Stock (Optional)</label>
                        <input 
                            type="number"
                            value={currentProduct.quantity}
                            onChange={(e) => setCurrentProduct({...currentProduct, quantity: parseInt(e.target.value) || 0})}
                            placeholder="0"
                            className="w-full px-7 py-4 bg-slate-50 border-none rounded-2xl text-[15px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 placeholder:text-slate-300 transition-all outline-none shadow-inner"
                        />
                    </div>
                </div>
            </MasterModal>

            <DeleteConfirmationModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                isLoading={formLoading}
                title="Remove Product"
                message="Are you sure you want to delete this product? This will also remove all associated inventory records."
            />
        </div>
    );
};

export default ProductManagement;
