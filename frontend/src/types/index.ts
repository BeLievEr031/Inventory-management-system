// ─── Menu Types ────────────────────────────────────────────────────────────────

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    isVegetarian: boolean;
    imageUrl?: string;
    isAvailable: boolean;
}

export interface MenuCategory {
    id: number;
    name: string;
    items: MenuItem[];
}

// ─── API Response Types ──────────────────────────────────────────────────────────

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

// ─── Receipt Types ─────────────────────────────────────────────────────────────

export type ReceiptStatus = "Draft" | "Ready" | "Done";

export interface Receipt {
    id: number;
    supplier_name: string;
    schedule_date: string;
    total_quantity: number;
    status: ReceiptStatus;
    responsible_user: number;
    type: "Receipt";
    created_at: string;
    updated_at: string;
    products?: ReceiptProduct[];
}

export interface ReceiptProduct {
    id: number;
    product_id: number;
    quantity: number;
    receipt_id: number;
    warehouse_code: string;
    location_code: string;
    created_at: string;
    updated_at: string;
}
