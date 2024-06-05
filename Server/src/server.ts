import Express from "express";
import { MongoDB, MongoSessions, webSockets } from "./config";
import { passportConfig } from "./config/passport.config";
import { routes } from "./config/routes.config";
import { routeErrors } from "./config/routeErrors.config";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { logger } from "./utils";
import { swagImplementer } from "./utils/swagger";
import session from "express-session";
import MongoStore from "connect-mongo";
dotenv.config();

// Initializing Express -------------------------------------------------------------------------------------------------------------
export const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());
export const PORT = process.env.PORT || 8080;
// Initializing server --------------------------------------------------------------------------------------------------------------
export const httpServer = app.listen(PORT, () => {
    logger.info(`Example app listening on ${PORT}`);
    logger.info(`login: http://localhost:${PORT}/api/sessions/login`);
});

// Initializing webSockets ----------------------------------------------------------------------------------------------------------
// webSockets();

// API DOCUMENTATION ------------------------------------------------------------------------------------------------
swagImplementer();

// Connecting Database --------------------------------------------------------------------------------------------------------------
MongoDB();
// Saving Sessions ------------------------------------------------------------------------------------------------------------------
// MongoSessions();
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
    cookie: { httpOnly: false },
};
app.use(session(sessionOptions));

// Initializing Passport ------------------------------------------------------------------------------------------------------------
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

// Initializing Routes --------------------------------------------------------------------------------------------------------------
routes();

app.get("/", (req, res) => {
    res.render("home");
});

// Handling Errors ------------------------------------------------------------------------------------------------------------------
routeErrors();
