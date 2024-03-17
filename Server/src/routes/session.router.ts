import Express, { Request, Response } from "express";
import { asyncHandler, isValidPassword } from "../utils";
import { validateUser } from "../middlewares";
import session, { Session, SessionData } from "express-session";
import passport from "passport";
import { SessionsController } from "../controllers/session.controller";

declare module "express-session" {
    export interface SessionData {
        user: any;
        _id: object;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        Age: number;
        isAdmin: boolean;
        role: string;
        __v: number;
        passport: any;
    }
}

export const sessionRouter = Express.Router();

sessionRouter.get("/login", SessionsController.renderLogin);

sessionRouter.get("/register", SessionsController.renderRegister);

sessionRouter.get("/faillogin", SessionsController.renderFailLogin);

sessionRouter.get("/failregister", SessionsController.renderFailRegister);

sessionRouter.get("/logout", SessionsController.destroySession);

sessionRouter.post("/recover-pass", SessionsController.recoverPass);

sessionRouter.get("/email-recovery", SessionsController.emailRecovery);

sessionRouter.post("/change-pass", SessionsController.changePass);

sessionRouter.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

sessionRouter.get(
    "/githubcallback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    SessionsController.githubCB
);

sessionRouter.post(
    "/register",
    passport.authenticate("register", {
        failureRedirect: "/api/sessions/failregister",
    }),
    asyncHandler(SessionsController.register)
);

sessionRouter.post(
    "/login",
    passport.authenticate("login", {
        failureRedirect: "/api/sessions/faillogin",
    }),
    validateUser,
    asyncHandler(SessionsController.login)
);
