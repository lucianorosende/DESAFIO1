import mongoose, { Schema } from "mongoose";

const ticketSchema: Schema = new Schema({
    code: {
        type: String,
        required: true,
    },
    purchase_datetime: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
    rejectedProds: {
        type: Array,
    },
});

export const ticketMongooseModel = mongoose.model("tickets", ticketSchema);
