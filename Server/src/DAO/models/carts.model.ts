import mongoose, { Schema } from "mongoose";
import { ICart } from "../../interfaces";

const cartSchema: Schema = new Schema({
    products: {
        type: [Number],
    },
    id: {
        type: Number,
    },
});

export const CartModel = mongoose.model<ICart>("carts", cartSchema);
