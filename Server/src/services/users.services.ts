import { UserMongooseModel } from "../DAO/MONGO";
import { SessionData } from "express-session";
import { IUser } from "../interfaces";
import { createHash } from "../utils";
import GitHubStrategy from "passport-github2";
import { UsersModel } from "../DAO/MONGO/users.mongo";
import { CartsService } from "./carts.services";

class UserService {
    async createUser(user: IUser) {
        const { firstName, lastName, email, Age, password, role } = user;
        const cart = await CartsService.addCart();
        const newUser: IUser = {
            email: email,
            firstName,
            lastName,
            Age,
            password: createHash(password),
            isAdmin: false,
            role: role || "user",
            cart: cart,
        };
        let create = await UsersModel.create(newUser);
        return create;
    }
    async findUserByEmail(email: string) {
        const find = await UsersModel.getByEmail(email);
        return find;
    }
    async findUserById(id: any) {
        const find = await UsersModel.getById(id);
        return find;
    }
    async fetchGHdata(accesToken: any, done: any, profile: any) {
        const res = await fetch("https://api.github.com/user/emails", {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: "Bearer " + accesToken,
                "X-Github-Api-Version": "2022-11-28",
            },
        });
        const emails = await res.json();
        const emailDetail = emails.find((email: any) => email.verified == true);
        if (!emailDetail) {
            return done(new Error("cannot get a valid email for this user"));
        }
        profile.email = emailDetail.email;
        return profile.email;
    }
    async updateRole(uid: string) {
        const find = await UsersModel.getById(uid);

        if (find?.role === "premium") {
            find.role = "user";
        } else {
            find!.role = "premium";
        }
        const update = await UsersModel.updateRole(find);
        return update;
    }
}

export const UsersService = new UserService();
