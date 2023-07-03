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
    console.log(`Example app listening on http://localhost:${PORT}`);
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

// Handling Errors ------------------------------------------------------------------------------------------------------------------
routeErrors();
