export interface ICreateLocationRequest {
    warehouse_code: string;
    name: string;
    code: string;
}

export interface IUpdateLocationRequest {
    name?: string;
    code?: string;
}
