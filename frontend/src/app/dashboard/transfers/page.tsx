"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MasterTable from "@/components/master/MasterTable";
import MasterModal from "@/components/master/MasterModal";
import api from "@/lib/api";
import { IconRefresh } from "@/components/layout/Icons";

const TransferManagement = () => {
    const [transfers, setTransfers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [locations, setLocations] = useState([]);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    
    const [currentTransfer, setCurrentTransfer] = useState({
        reference: "",
        source_warehouse_code: "",
        source_location_code: "",
        destination_warehouse_code: "",
        destination_location_code: "",
        schedule_date: new Date().toISOString().split('T')[0],
        products: [{ product_id: "", quantity: 1, sku: "" }]
    });

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const results = await Promise.allSettled([
                api.get("/transfers"),
                api.get("/warehouses"),
                api.get("/locations"),
                api.get("/products")
            ]);

            if (results[0].status === 'fulfilled') setTransfers(results[0].value.data?.data || []);
            if (results[1].status === 'fulfilled') setWarehouses(results[1].value.data?.data || []);
            if (results[2].status === 'fulfilled') setLocations(results[2].value.data?.data || []);
            if (results[3].status === 'fulfilled') setProducts(results[3].value.data?.data || []);
            
            // Check if any critical data failed
            if (results[1].status === 'rejected') console.error("Warehouses failed to load");
            if (results[2].status === 'rejected') console.error("Locations failed to load");
            
        } catch (err) {
            console.error("Failed to fetch data", err);
            setError("Failed to load dashboard data. Please refresh.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = transfers.filter((item: any) => 
        item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.source_location_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.destination_location_code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        setCurrentTransfer({
            reference: `INT/${new Date().getTime().toString().slice(-6)}`,
            source_warehouse_code: "",
            source_location_code: "",
            destination_warehouse_code: "",
            destination_location_code: "",
            schedule_date: new Date().toISOString().split('T')[0],
            products: [{ product_id: "", quantity: 1, sku: "" }]
        });
        setError("");
        setIsModalOpen(true);
    };

    const handleValidate = async (id: number) => {
        try {
            await api.post(`/transfers/${id}/validate`);
            fetchData();
        } catch (err: any) {
            alert(err.response?.data?.message || "Validation failed");
        }
    };

    const addProductLine = () => {
        setCurrentTransfer({
            ...currentTransfer,
            products: [...currentTransfer.products, { product_id: "", quantity: 1, sku: "" }]
        });
    };

    const updateProductLine = (index: number, field: string, value: any) => {
        const newProducts = [...currentTransfer.products] as any[];
        if (field === "product_id") {
            const prod = products.find((p: any) => p.id === parseInt(value));
            newProducts[index] = { ...newProducts[index], product_id: value, sku: prod?.sku || "" };
        } else {
            newProducts[index] = { ...newProducts[index], [field]: value };
        }
        setCurrentTransfer({ ...currentTransfer, products: newProducts });
    };

    const handleSubmit = async () => {
        try {
            if (!currentTransfer.source_location_code || !currentTransfer.destination_location_code || currentTransfer.products.some(p => !p.product_id)) {
                setError("Please fill in all required fields and products.");
                return;
            }
            await api.post("/transfers", currentTransfer);
            setIsModalOpen(false);
            fetchData();
        } catch (err: any) {
            setError(err.response?.data?.message || "Operation failed");
        }
    };

    const columns = [
        { header: "Reference", accessor: "reference" },
        { header: "From", accessor: "source_location_code", render: (item: any) => (
            <span className="text-slate-500 font-medium">{item.source_warehouse_code} / {item.source_location_code}</span>
        )},
        { header: "To", accessor: "destination_location_code", render: (item: any) => (
            <span className="text-teal-600 font-bold">{item.destination_warehouse_code} / {item.destination_location_code}</span>
        )},
        { header: "Date", accessor: "schedule_date" },
        { header: "Status", accessor: "status", render: (item: any) => (
            <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                item.status === 'Done' ? 'bg-teal-50 text-teal-600' : 'bg-orange-50 text-orange-600'
            }`}>
                {item.status}
            </span>
        )},
        { header: "Actions", accessor: "id", render: (item: any) => (
            item.status === "Draft" ? (
                <button 
                    onClick={(e) => { e.stopPropagation(); handleValidate(item.id); }}
                    className="px-4 py-2 bg-teal-500 text-white text-[12px] font-bold rounded-xl hover:bg-teal-600 transition-all shadow-lg shadow-teal-100"
                >
                    Validate
                </button>
            ) : null
        )}
    ];

    const sourceProducts = products.filter((p: any) => 
        p.warehouse_code === currentTransfer.source_warehouse_code && 
        p.location_code === currentTransfer.source_location_code
    );

    return (
        <div className="flex min-h-screen bg-[#f8f6f6] font-display text-slate-900">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0">
                <Header />
                <div className="p-8">
                    <MasterTable 
                        title="Internal Transfers"
                        columns={columns} 
                        data={filteredData} 
                        isLoading={isLoading}
                        onAdd={handleAdd}
                        onEdit={() => {}} 
                        onDelete={() => {}} 
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        addLabel="Transfer"
                    />
                </div>
            </main>

            <MasterModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create Transfer"
                onSubmit={handleSubmit}
                isLoading={false}
                submitLabel="Create Transfer"
            >
                <div className="space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-[14px] font-bold border border-red-100 italic">
                            ⚠ {error}
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2">Reference</label>
                            <input 
                                type="text"
                                value={currentTransfer.reference}
                                disabled
                                className="w-full px-7 py-4 bg-slate-50 border-none rounded-2xl text-[15px] font-bold text-slate-400 outline-none shadow-inner"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2">Schedule Date</label>
                            <input 
                                type="date"
                                value={currentTransfer.schedule_date}
                                onChange={(e) => setCurrentTransfer({...currentTransfer, schedule_date: e.target.value})}
                                className="w-full px-7 py-4 bg-slate-100 border-none rounded-2xl text-[15px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 outline-none shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50 rounded-[32px] space-y-6">
                        <h3 className="text-[14px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                            Source Location
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <select 
                                value={currentTransfer.source_warehouse_code}
                                onChange={(e) => setCurrentTransfer({...currentTransfer, source_warehouse_code: e.target.value, source_location_code: ""})}
                                className="w-full px-7 py-4 bg-white border-none rounded-2xl text-[15px] font-bold text-slate-700 outline-none shadow-sm"
                            >
                                <option value="">{warehouses.length === 0 ? "No Warehouses Found" : "Select Warehouse"}</option>
                                {warehouses.map((wh: any) => <option key={wh.id} value={wh.code}>{wh.name} ({wh.code})</option>)}
                            </select>
                            <select 
                                value={currentTransfer.source_location_code}
                                onChange={(e) => setCurrentTransfer({...currentTransfer, source_location_code: e.target.value})}
                                className="w-full px-7 py-4 bg-white border-none rounded-2xl text-[15px] font-bold text-slate-700 outline-none shadow-sm"
                            >
                                <option value="">{!currentTransfer.source_warehouse_code ? "Select Warehouse First" : locations.filter((l: any) => l.warehouse_code === currentTransfer.source_warehouse_code).length === 0 ? "No Locations Found" : "Select Location"}</option>
                                {locations.filter((l: any) => l.warehouse_code === currentTransfer.source_warehouse_code).map((loc: any) => (
                                    <option key={loc.id} value={loc.code}>{loc.name} ({loc.code})</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="p-6 bg-teal-50/50 rounded-[32px] space-y-6 border border-teal-100/50">
                        <h3 className="text-[14px] font-black text-teal-600/50 uppercase tracking-widest flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                            Destination Location
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <select 
                                value={currentTransfer.destination_warehouse_code}
                                onChange={(e) => setCurrentTransfer({...currentTransfer, destination_warehouse_code: e.target.value, destination_location_code: ""})}
                                className="w-full px-7 py-4 bg-white border-none rounded-2xl text-[15px] font-bold text-slate-700 outline-none shadow-sm"
                            >
                                <option value="">{warehouses.length === 0 ? "No Warehouses Found" : "Select Warehouse"}</option>
                                {warehouses.map((wh: any) => <option key={wh.id} value={wh.code}>{wh.name} ({wh.code})</option>)}
                            </select>
                            <select 
                                value={currentTransfer.destination_location_code}
                                onChange={(e) => setCurrentTransfer({...currentTransfer, destination_location_code: e.target.value})}
                                className="w-full px-7 py-4 bg-white border-none rounded-2xl text-[15px] font-bold text-slate-700 outline-none shadow-sm"
                            >
                                <option value="">{!currentTransfer.destination_warehouse_code ? "Select Warehouse First" : locations.filter((l: any) => l.warehouse_code === currentTransfer.destination_warehouse_code).length === 0 ? "No Locations Found" : "Select Location"}</option>
                                {locations.filter((l: any) => l.warehouse_code === currentTransfer.destination_warehouse_code).map((loc: any) => (
                                    <option key={loc.id} value={loc.code}>{loc.name} ({loc.code})</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-2">
                            <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest">Products to Transfer</label>
                            <button onClick={addProductLine} className="text-[#ec5b13] text-[12px] font-black">+ Add Line</button>
                        </div>
                        {currentTransfer.products.map((line, idx) => (
                            <div key={idx} className="grid grid-cols-12 gap-3 items-center">
                                <div className="col-span-8">
                                    <select 
                                        value={line.product_id}
                                        onChange={(e) => updateProductLine(idx, "product_id", e.target.value)}
                                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-[14px] font-bold text-slate-700 outline-none shadow-inner"
                                    >
                                        <option value="">Select Product</option>
                                        {sourceProducts.map((p: any) => (
                                            <option key={p.id} value={p.id}>{p.name} ({p.sku}) - Qty: {p.quantity}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-4">
                                    <input 
                                        type="number"
                                        value={line.quantity}
                                        onChange={(e) => updateProductLine(idx, "quantity", parseInt(e.target.value))}
                                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-[14px] font-bold text-slate-700 outline-none shadow-inner"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </MasterModal>
        </div>
    );
};

export default TransferManagement;
