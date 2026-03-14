"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MasterTable from "@/components/master/MasterTable";
import MasterModal from "@/components/master/MasterModal";
import DeleteConfirmationModal from "@/components/master/DeleteConfirmationModal";
import api from "@/lib/api";

const WarehouseManagement = () => {
    const [warehouses, setWarehouses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentWarehouse, setCurrentWarehouse] = useState({ name: "", code: "" });
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchWarehouses = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/warehouses");
            setWarehouses(response.data?.data || []); // Access .data.data
        } catch (err: any) {
            console.error("Failed to fetch warehouses", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWarehouses();
    }, []);

    const filteredData = warehouses.filter((item: any) => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        setCurrentWarehouse({ name: "", code: "" });
        setIsEditing(false);
        setError("");
        setIsModalOpen(true);
    };

    const handleEdit = (item: any) => {
        setCurrentWarehouse(item);
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
            await api.delete(`/warehouses/${itemToDelete}`);
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
            fetchWarehouses();
        } catch (err: any) {
            alert(err.response?.data?.error?.message || "Failed to delete warehouse");
        } finally {
            setFormLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!currentWarehouse.name || !currentWarehouse.code) {
            setError("Please fill in all required fields.");
            return;
        }

        try {
            setFormLoading(true);
            setError("");
            if (isEditing) {
                await api.put(`/warehouses/${(currentWarehouse as any).id}`, currentWarehouse);
            } else {
                await api.post("/warehouses", currentWarehouse);
            }
            setIsModalOpen(false);
            fetchWarehouses();
        } catch (err: any) {
            setError(err.response?.data?.error?.message || "Something went wrong.");
        } finally {
            setFormLoading(false);
        }
    };

    const columns = [
        { header: "Warehouse Name", accessor: "name" },
        { header: "Code", accessor: "code" },
        { 
            header: "Created At", 
            accessor: "created_at",
            render: (item: any) => new Date(item.created_at).toLocaleDateString()
        }
    ];

    return (
        <div className="flex min-h-screen bg-[#f8f6f6] font-display text-slate-900">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0">
                <Header />
                <div className="p-8">
                    <MasterTable 
                        title="Warehouse Management"
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
                title={isEditing ? "Edit Warehouse" : "Add New Warehouse"}
                onSubmit={handleSubmit}
                isLoading={formLoading}
                submitLabel={isEditing ? "Update Warehouse" : "Create Warehouse"}
            >
                <div className="space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-[14px] font-bold border border-red-100 italic transition-all animate-in shake">
                            ⚠ {error}
                        </div>
                    )}
                    
                    <div className="space-y-2">
                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2">Warehouse Name</label>
                        <input 
                            type="text"
                            value={currentWarehouse.name}
                            onChange={(e) => setCurrentWarehouse({...currentWarehouse, name: e.target.value})}
                            placeholder="e.g. Central Hub"
                            className="w-full px-7 py-4 bg-slate-50 border-none rounded-2xl text-[15px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 placeholder:text-slate-300 transition-all outline-none shadow-inner"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2">Warehouse Code</label>
                        <input 
                            type="text"
                            value={currentWarehouse.code}
                            onChange={(e) => setCurrentWarehouse({...currentWarehouse, code: e.target.value})}
                            placeholder="e.g. WH-001"
                            className="w-full px-7 py-4 bg-slate-50 border-none rounded-2xl text-[15px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 placeholder:text-slate-300 transition-all outline-none shadow-inner uppercase"
                        />
                    </div>
                </div>
            </MasterModal>

            <DeleteConfirmationModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                isLoading={formLoading}
                title="Remove Warehouse"
                message="Are you sure you want to delete this warehouse? This will also remove any associated locations."
            />
        </div>
    );
};

export default WarehouseManagement;
