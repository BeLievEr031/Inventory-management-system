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
