import mongoose, { Schema } from "mongoose";
import { ICart } from "../../interfaces";

const cartSchema: Schema = new Schema({
    products: [
        {
            id: Number,
            quantity: Number,
        },
    ],
    id: Number,
});

export const CartModel = mongoose.model<ICart>("carts", cartSchema);
