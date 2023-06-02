import mongoose, { Schema } from "mongoose";
import { ICart } from "../../interfaces";

const messageSchema: Schema = new Schema({});

export const MessageModel = mongoose.model<ICart>("messages", messageSchema);
