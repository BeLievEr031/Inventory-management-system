export interface IDeliveryProduct {
    product_id: number;
    quantity: number;
    warehouse_code: string;
    location_code: string;
}

export interface ICreateDeliveryRequest {
    reference: string;
    delivery_address: string;
    contact_name?: string;
    schedule_date: string;
    operation_type?: string;
    products: IDeliveryProduct[];
}

export interface IUpdateDeliveryRequest {
    delivery_address?: string;
    contact_name?: string;
    schedule_date?: string;
    status?: "Draft" | "Waiting" | "Ready" | "Done";
}
