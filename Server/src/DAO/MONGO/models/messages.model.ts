import mongoose, { Schema, Model } from "mongoose";
import { IMessages } from "../../../interfaces";

const MessageSchema: Schema = new Schema({
    author: { type: String },
    date: { type: String },
    message: { type: String },
});
export const MessageMongooseModel: Model<IMessages> = mongoose.model<IMessages>(
    "messages",
    MessageSchema
);
