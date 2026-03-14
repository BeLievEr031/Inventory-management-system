export interface IReceiptProduct {
    product_id: number;
    quantity: number;
    warehouse_code: string;
    location_code: string;
}

export interface ICreateReceiptRequest {
    supplier_name: string;
    schedule_date: string;
    products: IReceiptProduct[];
}

export interface IUpdateReceiptRequest {
    supplier_name?: string;
    schedule_date?: string;
    status?: "Draft" | "Ready" | "Done";
}
