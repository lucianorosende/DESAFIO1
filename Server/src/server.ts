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
dotenv.config();

// Initializing Express -------------------------------------------------------------------------------------------------------------
export const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());
app.use(cookieParser());
export const PORT = process.env.PORT || 8080;

// Initializing public and hbs Engine -----------------------------------------------------------------------------------------------
publicAndHbs();

// Initializing server --------------------------------------------------------------------------------------------------------------
export const httpServer = app.listen(PORT, () => {
    logger.info(`Example app listening on ${PORT}`);
    logger.info(`login: http://localhost:${PORT}/api/sessions/login`);
});

// Saving Sessions ------------------------------------------------------------------------------------------------------------------
MongoSessions();

// Initializing Passport ------------------------------------------------------------------------------------------------------------
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

// Initializing webSockets ----------------------------------------------------------------------------------------------------------
webSockets();

// Initializing Routes --------------------------------------------------------------------------------------------------------------
routes();

// Connecting Database --------------------------------------------------------------------------------------------------------------
MongoDB();

// Logging -------------------------------------------------------------------------------------------------------------------------
app.get("/loggerTest", (req, res) => {
    logger.debug("test");
    logger.verbose("test");
    logger.http("test");
    logger.info("test");
    logger.warn("test");
    logger.error("test");
});

// Handling Errors ------------------------------------------------------------------------------------------------------------------
routeErrors();
