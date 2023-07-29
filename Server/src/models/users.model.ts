import { IUser } from "../interfaces";
import { UserMongooseModel } from "../schemas/usersSchema";
import { createHash } from "../utils";

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
}

export const UsersModel = new UserModel();
