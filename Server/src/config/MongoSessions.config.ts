import { app } from "../server";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();

export const MongoSessions = () => {
    const sessionOptions = {
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            ttl: 7200,
        }),
        secret: "SECRET-CODE",
        resave: false,
        saveUninitialized: true,
    };
    app.use(session(sessionOptions));
};
