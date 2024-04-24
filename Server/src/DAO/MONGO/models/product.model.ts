import mongoose, { Schema, Model } from "mongoose";
import { IProduct } from "../../../interfaces";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        text: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    pID: {
        type: Number,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
});
productSchema.plugin(mongoosePaginate);
export const ProductMongooseModel: Model<IProduct> = mongoose.model<IProduct>(
    "Products",
    productSchema
);
