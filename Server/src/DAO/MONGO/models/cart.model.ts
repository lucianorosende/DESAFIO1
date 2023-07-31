import mongoose, { Schema } from "mongoose";
import { ICart } from "../../../interfaces";

const cartSchema: Schema = new Schema({
    products: [
        {
            quantity: Number,
            pID: Number,
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
            },
        },
    ],
    cID: Number,
});

export const CartMongooseModel = mongoose.model<ICart>("carts", cartSchema);
