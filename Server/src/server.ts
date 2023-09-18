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
import swaggerjsdoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
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

// API DOCUMENTATION ------------------------------------------------------------------------------------------------
const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "This is my API.",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
        paths: {},
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
};
const swag = swaggerjsdoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swag));

// Initializing Routes --------------------------------------------------------------------------------------------------------------
routes();

// Connecting Database --------------------------------------------------------------------------------------------------------------
MongoDB();

// Handling Errors ------------------------------------------------------------------------------------------------------------------
routeErrors();
