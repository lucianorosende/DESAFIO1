import mongoose, { Schema, Model } from "mongoose";
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

export const CartMongooseModel: Model<ICart> = mongoose.model<ICart>(
    "carts",
    cartSchema
);
