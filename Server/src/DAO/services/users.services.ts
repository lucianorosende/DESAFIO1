import { UserModel } from "../models/users.model";

export class UserService {
    async createUser(user: any) {
        const { FirstName, LastName, Email, Age, password } = user;
        // if (!FirstName || !LastName || !Email || !Age || !password) {
        // }
        await UserModel.create({
            firstName: FirstName,
            lastName: LastName,
            email: Email,
            Age: Age,
            password: password,
            isAdmin: false,
        });
    }
    async checkUser(user: any) {
        const { email, password } = user;
        const userReturn = await UserModel.findOne({ email: email });
        return userReturn;
    }
}
