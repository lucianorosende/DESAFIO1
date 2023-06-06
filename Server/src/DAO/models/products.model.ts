import mongoose, { Schema } from "mongoose";
import { IProduct } from "../../interfaces";

const productSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnails: {
        type: [String],
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
    },
    category: {
        type: String,
        required: true,
    },
    pID: {
        type: Number,
        required: true,
    },
});

export const ProductModel = mongoose.model<IProduct>("Products", productSchema);
