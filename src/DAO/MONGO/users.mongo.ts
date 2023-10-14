import { IUser } from "../../interfaces";
import { UserMongooseModel } from "./models";

class UserModel {
    async getUsers() {
        return await UserMongooseModel.find({});
    }
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
    async updateConnection(user: any) {
        const userUpdate = await UserMongooseModel.updateOne(
            { email: user.email },
            { $set: user }
        );
        return userUpdate;
    }
    async deleteExpiredAccount(email: any) {
        const deleteUser = await UserMongooseModel.deleteOne({ email: email });
        return deleteUser;
    }
}

export const UsersModel = new UserModel();
