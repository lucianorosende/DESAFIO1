import { IUser } from "../../interfaces";
import { UserMongooseModel } from "./models";

class UserModel {
    async getById(id: any) {
        return await UserMongooseModel.findById(id);
    }
    async getByEmail(email: string) {
        let find = await UserMongooseModel.findOne({
            email: email,
        });
        return find;
    }
    async create(user: IUser) {
        let create = await UserMongooseModel.create(user);
        return create;
    }
    async updateRole(user: any) {
        const userUpdate = await UserMongooseModel.updateOne(
            { _id: user._id },
            { $set: user }
        );
        return userUpdate;
    }
}

export const UsersModel = new UserModel();
