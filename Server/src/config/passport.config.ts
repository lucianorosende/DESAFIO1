import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils/bcrypt";
import { Strategy as GitHubStrategy } from "passport-github2";
import { SessionData } from "express-session";
import { UsersService } from "../services";

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
                    let ghData = await UsersService.fetchGHdata(
                        accesToken,
                        done,
                        profile
                    );
                    let user = await UsersService.findUserByEmail(ghData);
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
                            Age: 0,
                        };
                        let userCreated = await UsersService.createUser(
                            newUser
                        );
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
                    let user = await UsersService.findUserByEmail(username);
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
                    let user = await UsersService.findUserByEmail(username);
                    if (user) {
                        console.log("user already registered");
                        return done(null, false);
                    }
                    const newUser = await UsersService.createUser(req.body);
                    console.log("User created");
                    return done(null, newUser);
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
        let user = await UsersService.findUserById(id);
        done(null, user);
    });
}
