import Express, { Request, Response } from "express";
import { asyncHandler } from "../utils";
import { UserService } from "../DAO/services";
import session, { SessionData } from "express-session";

declare module "express-session" {
    export interface SessionData {
        email?: string;
        isAdmin?: boolean;
    }
}

declare module "express" {
    interface Request {
        session?: session.Session & Partial<SessionData>;
    }
}

const Service = new UserService();

export const sessionRouter = Express.Router();

sessionRouter.get("/login", (req: Request, res: Response) => {
    console.log(req.session);
    return res.render("login", {});
});

sessionRouter.get("/register", (req: Request, res: Response) => {
    return res.render("register", {});
});

sessionRouter.post(
    "/register",
    asyncHandler(async (req: Request, res: Response) => {
        // const CreateUser = await Service.createUser(req.body);
        (req.session as SessionData).email = req.body.Email;
        (req.session as SessionData).isAdmin = false;
        return res.redirect("/api/sessions/login");
    })
);
