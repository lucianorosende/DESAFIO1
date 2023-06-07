import mongoose, { Schema, Model } from "mongoose";
import { IProduct } from "../../interfaces";
import mongoosePaginate from "mongoose-paginate-v2";

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
productSchema.plugin(mongoosePaginate);
export const ProductModel: Model<IProduct> = mongoose.model<IProduct>(
    "Products",
    productSchema
);
