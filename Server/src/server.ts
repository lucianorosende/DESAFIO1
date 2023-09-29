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
import Handlebars from "handlebars";
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

Handlebars.registerHelper("eq", function (value1, value2) {
    return value1 === value2;
});
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

// API DOCUMENTATION ------------------------------------------------------------------------------------------------
swagImplementer();

// Initializing Routes --------------------------------------------------------------------------------------------------------------
routes();

// Connecting Database --------------------------------------------------------------------------------------------------------------
MongoDB();

// Handling Errors ------------------------------------------------------------------------------------------------------------------
routeErrors();
