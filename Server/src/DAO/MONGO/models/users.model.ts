import mongoose, { Schema, Model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IUser } from "../../../interfaces";

const UserSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
        max: 100,
    },
    lastName: {
        type: String,
        required: true,
        max: 100,
    },
    email: {
        type: String,
        required: true,
        max: 100,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        max: 100,
    },
    Age: {
        type: Number,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    cart: {
        type: Object,
        required: true,
    },
});
UserSchema.plugin(mongoosePaginate);
export const UserMongooseModel: Model<IUser> = mongoose.model<IUser>(
    "users",
    UserSchema
);
