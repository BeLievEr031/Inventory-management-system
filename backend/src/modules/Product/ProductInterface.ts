export interface ICreateProductRequest {
    name: string;
    sku: string;
    category: string;
    warehouse_code: string;
    location_code: string;
    quantity?: number;
}

export interface IUpdateProductRequest {
    name?: string;
    sku?: string;
    category?: string;
    warehouse_code?: string;
    location_code?: string;
    quantity?: number;
}
