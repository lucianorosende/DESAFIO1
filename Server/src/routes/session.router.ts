import Express, { Request, Response } from "express";
import { asyncHandler, isValidPassword } from "../utils";
import { UserService } from "../DAO/services";
import { validateUser } from "../middleware";
import session, { Session, SessionData } from "express-session";
import passport from "passport";

declare module "express-session" {
    export interface SessionData {
        email?: string;
        firstName?: string;
        lastName?: string;
        isAdmin?: boolean;
        role?: string;
    }
}

const Service = new UserService();

export const sessionRouter = Express.Router();

sessionRouter.get("/login", (req: Request, res: Response) => {
    return res.render("login", {});
});
sessionRouter.get("/logout", (req: Request, res: Response) => {
    (req.session as Session).destroy((err: Error | null) => {
        if (err) {
            return console.log(err);
        }
        return res.redirect("/api/sessions/login");
    });
});

sessionRouter.get("/register", (req: Request, res: Response) => {
    return res.render("register", {});
});

sessionRouter.get("/profile", validateUser, (req: Request, res: Response) => {
    const user = {
        email: (req.session as SessionData).email,
        isAdmin: (req.session as SessionData).isAdmin,
        firstName: (req.session as SessionData).firstName,
        lastName: (req.session as SessionData).lastName,
    };
    return res.render("profile", { user: user });
});

sessionRouter.post(
    "/register",
    passport.authenticate("register", {
        failureRedirect: "/auth/failregister",
    }),
    asyncHandler(async (req: Request, res: Response) => {
        if (!req.user) {
            res.json({ error: "something went wrong" });
        }
        (req.session as any).user = req.user;
        // (req.session as SessionData).email = req.body.email;
        // (req.session as SessionData).isAdmin = false;
        // (req.session as SessionData).role = "user";
        // const CreateUser = await Service.createUser(
        //     req.body,
        //     req.session as SessionData
        // );
        return res.redirect("/api/sessions/login");
    })
);

sessionRouter.post(
    "/login",
    passport.authenticate("login", {
        failureRedirect: "/auth/faillogin",
    }),
    asyncHandler(async (req: Request, res: Response) => {
        if (!req.user) {
            res.json({ error: "user not found" });
        }
        (req.session as any).user = req.user;
        return res.redirect("/views/products");
        // const CheckUser = await Service.checkUser(req.body);
        // if (
        //     CheckUser &&
        //     isValidPassword(req.body.password, CheckUser.password)
        // ) {
        //     (req.session as SessionData).email = CheckUser.email;
        //     (req.session as SessionData).firstName = CheckUser.firstName;
        //     (req.session as SessionData).lastName = CheckUser.lastName;
        //     (req.session as SessionData).isAdmin = CheckUser.isAdmin;
        // }
    })
);
