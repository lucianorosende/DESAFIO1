import { Document } from "mongoose";

export interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    thumbnail: string[];
    code: string;
    stock: number;
    status: boolean;
    category: string;
    quantity?: number;
    owner?: string;
    pID?: number;
}
