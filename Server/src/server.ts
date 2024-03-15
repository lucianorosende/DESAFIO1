import Express from "express";
import {
    MongoDB,
    MongoSessions,
    passportConfig,
    routeErrors,
    routes,
    publicAndHbs,
    webSockets,
} from "./config";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { logger } from "./utils";
import { swagImplementer } from "./utils/swagger";
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

// Initializing public and hbs Engine -----------------------------------------------------------------------------------------------
publicAndHbs();
// Initializing server --------------------------------------------------------------------------------------------------------------
export const httpServer = app.listen(PORT, () => {
    logger.info(`Example app listening on ${PORT}`);
    logger.info(`login: http://localhost:${PORT}/api/sessions/login`);
});

// Initializing webSockets ----------------------------------------------------------------------------------------------------------
webSockets();

// API DOCUMENTATION ------------------------------------------------------------------------------------------------
swagImplementer();

// Connecting Database --------------------------------------------------------------------------------------------------------------
MongoDB();
// Saving Sessions ------------------------------------------------------------------------------------------------------------------
MongoSessions();

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
