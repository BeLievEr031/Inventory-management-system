"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MasterTable from "@/components/master/MasterTable";
import MasterModal from "@/components/master/MasterModal";
import DeleteConfirmationModal from "@/components/master/DeleteConfirmationModal";
import api from "@/lib/api";

const LocationManagement = () => {
    const [locations, setLocations] = useState<any[]>([]);
    const [warehouses, setWarehouses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({ name: "", code: "", warehouse_code: "" });
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [locRes, whRes] = await Promise.all([
                api.get("/locations"),
                api.get("/warehouses")
            ]);
            setLocations(locRes.data?.data || []);
            setWarehouses(whRes.data?.data || []);
        } catch (err: any) {
            console.error("Failed to fetch data", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = locations.filter((item: any) => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.warehouse_code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        setCurrentLocation({ name: "", code: "", warehouse_code: warehouses[0]?.code || "" });
        setIsEditing(false);
        setError("");
        setIsModalOpen(true);
    };

    const handleEdit = (item: any) => {
        setCurrentLocation(item);
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
            await api.delete(`/locations/${itemToDelete}`);
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
            fetchData();
        } catch (err: any) {
            alert(err.response?.data?.error?.message || "Failed to delete location");
        } finally {
            setFormLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!currentLocation.name || !currentLocation.code || !currentLocation.warehouse_code) {
            setError("Please fill in all required fields.");
            return;
        }

        try {
            setFormLoading(true);
            setError("");
            if (isEditing) {
                await api.put(`/locations/${(currentLocation as any).id}`, currentLocation);
            } else {
                await api.post("/locations", currentLocation);
            }
            setIsModalOpen(false);
            fetchData();
        } catch (err: any) {
            setError(err.response?.data?.error?.message || "Something went wrong.");
        } finally {
            setFormLoading(false);
        }
    };

    const columns = [
        { header: "Location Name", accessor: "name" },
        { header: "Location Code", accessor: "code" },
        { 
            header: "Warehouse", 
            accessor: "warehouse_code",
            render: (item: any) => (
                <span className="px-3 py-1 bg-orange-50 text-[#ec5b13] rounded-full text-[12px] font-black uppercase tracking-wider border border-orange-100/50">
                    {item.warehouse_code}
                </span>
            )
        },
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
                        title="Location Management"
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
                title={isEditing ? "Edit Location" : "Add New Location"}
                onSubmit={handleSubmit}
                isLoading={formLoading}
                submitLabel={isEditing ? "Update Location" : "Create Location"}
            >
                <div className="space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-[14px] font-bold border border-red-100 italic transition-all animate-in shake">
                            ⚠ {error}
                        </div>
                    )}
                    
                    <div className="space-y-2">
                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2">Warehouse Association</label>
                        <select 
                            value={currentLocation.warehouse_code}
                            onChange={(e) => setCurrentLocation({...currentLocation, warehouse_code: e.target.value})}
                            disabled={isEditing}
                            className="w-full px-7 py-4 bg-slate-50 border-none rounded-2xl text-[15px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 outline-none shadow-inner appearance-none cursor-pointer disabled:opacity-50"
                        >
                            {warehouses.map((wh: any) => (
                                <option key={wh.id} value={wh.code}>{wh.name} ({wh.code})</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2">Location Name</label>
                        <input 
                            type="text"
                            value={currentLocation.name}
                            onChange={(e) => setCurrentLocation({...currentLocation, name: e.target.value})}
                            placeholder="e.g. Aisle 1 - Shelf A"
                            className="w-full px-7 py-4 bg-slate-50 border-none rounded-2xl text-[15px] font-bold focus:ring-4 focus:ring-orange-50 text-slate-700 placeholder:text-slate-300 transition-all outline-none shadow-inner"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2">Location Code</label>
                        <input 
                            type="text"
                            value={currentLocation.code}
                            onChange={(e) => setCurrentLocation({...currentLocation, code: e.target.value})}
                            placeholder="e.g. L-1A"
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
                title="Remove Location"
                message="Are you sure you want to delete this location? This action will remove it from its assigned warehouse."
            />
        </div>
    );
};

export default LocationManagement;
