import { app } from "../server";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();

export const MongoSessions = () => {
    app.set("trust proxy", 1);
    const sessionOptions = {
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
        }),
        secret: "SECRET-CODE",
        resave: false,
        saveUninitialized: false,
        rolling: true,
        proxy: true,
        cookie: {
            httpOnly: false,
        },
    };
    app.use(session(sessionOptions));
};
