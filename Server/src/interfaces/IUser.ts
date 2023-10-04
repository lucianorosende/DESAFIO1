import { Document } from "mongoose";

export interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    Age: number;
    isAdmin: boolean;
    role: string;
    cart: any;
    documents: String[];
}
