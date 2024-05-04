import { Document } from "mongoose";

export interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    category: string;
    code: number;
    quantity?: number;
    rating?: string;
    subtotal?: number;
    owner?: string;
    pID?: number;
}
