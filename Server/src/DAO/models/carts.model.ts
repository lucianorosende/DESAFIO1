import mongoose, { Schema } from "mongoose";
import { ICart } from "../../interfaces";

const cartSchema: Schema = new Schema({
    products: [
        {
            pID: Number,
            quantity: Number,
        },
    ],
    cID: Number,
});

export const CartModel = mongoose.model<ICart>("carts", cartSchema);
