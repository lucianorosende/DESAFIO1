import { app } from "../server";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();

export const MongoStoreSessions = () => {
    const sessionOptions = {
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            ttl: 7200,
        }),
        secret: "SECRET-CODE",
        resave: true,
        saveUninitialized: true,
    };
    app.use(session(sessionOptions));
};
