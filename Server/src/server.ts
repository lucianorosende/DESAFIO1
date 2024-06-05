import Express from "express";
import { webSockets } from "./config/websockets.config";
import { MongoDB } from "./config/MongoDB.config";
import { MongoSessions } from "./config/MongoSessions.config";
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
import { userRouter } from "./routes/users.router";
import { sessionRouter } from "./routes/session.router";
import { cartRouter } from "./routes/cart.router";
import { productRouter } from "./routes/products.router";
import { Request, Response } from "express";
import { httpStatus } from "./utils";
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
// swagImplementer();

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
// routes();
app.use("/api/sessions", sessionRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);

// Handling Errors ------------------------------------------------------------------------------------------------------------------
// routeErrors();
app.on("error", (err) => logger.error("server error: " + err));
app.all("*", (req: Request, res: Response) => {
    res.status(httpStatus.NotFound).json({
        status: "error",
        msg: "route not found",
        data: {},
    });
});
