export interface IRegisterRequest {
    login_id: string;
    email: string;
    password?: string;
}

export interface ILoginRequest {
    login_id?: string;
    email?: string;
    password?: string;
}

export interface IForgetPasswordRequest {
    login_id?: string;
    email?: string;
    new_password?: string;
}
