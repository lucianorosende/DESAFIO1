import { UserModel } from "../DAO/models";
import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils/bcrypt";
import { Strategy as GitHubStrategy } from "passport-github2";

const LocalStrategy = local.Strategy;

export function passportConfig() {
    passport.use(
        "github",
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID!,
                clientSecret: process.env.GITHUB_CLIENTSECRET!,
                callbackURL: process.env.GITHUB_CALLBACK_URL!,
            },
            async (accesToken: any, _: any, profile: any, done: any) => {
                try {
                    const res = await fetch(
                        "https://api.github.com/user/emails",
                        {
                            headers: {
                                Accept: "application/vnd.github+json",
                                Authorization: "Bearer " + accesToken,
                                "X-Github-Api-Version": "2022-11-28",
                            },
                        }
                    );
                    const emails = await res.json();
                    console.log(emails);
                    const emailDetail = emails.find(
                        (email: any) => email.verified == true
                    );
                    if (!emailDetail) {
                        return done(
                            new Error("cannot get a valid email for this user")
                        );
                    }
                    profile.email = emailDetail.email;
                    let user = await UserModel.findOne({
                        email: profile.email,
                    });
                    if (!user) {
                        const newUser = {
                            email: profile.email,
                            firstName:
                                profile._json.name ||
                                profile._json.login ||
                                "noname",
                            lastName: "nolast",
                            isAdmin: false,
                            password: "nopass",
                            role: profile._json.type,
                        };
                        let userCreated = await UserModel.create(newUser);
                        console.log("User Registration succesful");
                        return done(null, userCreated);
                    } else {
                        console.log("User already exists");
                        return done(null, user);
                    }
                } catch (e) {
                    console.log("Error in auth github");
                    console.log(e);
                    return done(e);
                }
            }
        )
    );

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
