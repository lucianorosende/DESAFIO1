import { Document } from "mongoose";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    Age: number;
    isAdmin: boolean;
    role: string;
    cart: any;
}
