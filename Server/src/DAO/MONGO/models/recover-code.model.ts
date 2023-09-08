import mongoose, { Schema, Model } from "mongoose";
import { IMessages } from "../../../interfaces";

const RecoverCodeSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    expire: {
        type: Number,
        required: true,
    },
});
export const RecoverCodeMongooseModel = mongoose.model(
    "recover-code",
    RecoverCodeSchema
);
