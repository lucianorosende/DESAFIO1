import Express from "express";
import {
    routeInitializer,
    publicAndHbs,
    webSocketInitializer,
    routeErrors,
    connectToMongoDB,
    MongoStoreSessions,
    initializePassport,
} from "./utils";
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
MongoStoreSessions();

// Initializing Passport ------------------------------------------------------------------------------------------------------------
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Initializing webSockets ----------------------------------------------------------------------------------------------------------
webSocketInitializer();

// Initializing Routes --------------------------------------------------------------------------------------------------------------
routeInitializer();

// Connecting Database --------------------------------------------------------------------------------------------------------------
connectToMongoDB();

// Handling Errors ------------------------------------------------------------------------------------------------------------------
routeErrors();
