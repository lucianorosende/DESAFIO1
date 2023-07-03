import { UserModel } from "../DAO/models";
import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils/bcrypt";

const LocalStrategy = local.Strategy;

export function passportConfig() {
    passport.use(
        "login",
        new LocalStrategy(
            { usernameField: "email" },
            async (username, password, done) => {
                try {
                    const user = await UserModel.findOne({ email: username });
                    if (!user) {
                        console.log("user not found with email " + username);
                        return done(null, false);
                    }

                    if (!isValidPassword(password, user.password)) {
                        console.log("invalid password");
                        return done(null, false);
                    }
                    return done(null, user);
                } catch (e) {
                    console.log(e);
                }
            }
        )
    );
    passport.use(
        "register",
        new LocalStrategy(
            { passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                try {
                    const { firstName, lastName, email, Age, password } =
                        req.body;
                    let user = await UserModel.findOne({ email: username });
                    console.log(user);
                    if (user) {
                        console.log("user already registered");
                        return done(null, false);
                    }
                    const newUser = {
                        email,
                        firstName,
                        lastName,
                        Age,
                        password: createHash(password),
                        isAdmin: false,
                        role: "user",
                    };
                    let createUser = await UserModel.create(newUser);
                    console.log("User created");
                    return done(null, createUser);
                } catch (e) {
                    console.log(e);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById(id);
        done(null, user);
    });
}
