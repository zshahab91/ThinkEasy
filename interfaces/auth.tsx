export interface IAuthState {
    user: IUser;
}
export interface IUser {
    createdAt:string | Date;
    email: string;
    firstname:string;
    id:string;
    lastname:string;
    password:string;
    role:string;
    updatedAt:string | Date;
}
export interface ILogin {
    email: string;
    password: string | number;
}
export interface IAddUser {
    firstname: string;
    lastname: string;
    email: string;
    password: string | number;
    confirmPassword?: string | number;
}
export interface SignupResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}