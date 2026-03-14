export interface ITransferProduct {
    product_id: number;
    quantity: number;
}

export interface ICreateTransferRequest {
    reference: string;
    source_warehouse_code: string;
    source_location_code: string;
    destination_warehouse_code: string;
    destination_location_code: string;
    schedule_date: string;
    products: ITransferProduct[];
}

export interface IUpdateTransferRequest {
    status?: "Draft" | "Done";
}
