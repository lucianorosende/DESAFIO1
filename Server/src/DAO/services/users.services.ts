import { UserModel } from "../models/users.model";
import { SessionData } from "express-session";
import { IUser } from "../../interfaces";

export class UserService {
    async createUser(user: IUser, reqSession: SessionData) {
        console.log(reqSession.role);
        const { firstName, lastName, email, Age, password } = user;
        // if (!FirstName || !LastName || !Email || !Age || !password) {
        // }
        await UserModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            Age: Age,
            password: password,
            isAdmin: false,
            role: reqSession.role,
        });
    }
    async checkUser(user: IUser) {
        const { email, password } = user;
        const userReturn = await UserModel.findOne({ email: email });
        return userReturn;
    }
}
