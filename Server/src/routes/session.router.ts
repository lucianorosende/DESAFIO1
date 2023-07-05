import Express, { Request, Response } from "express";
import { asyncHandler, isValidPassword } from "../utils";
import { UserService } from "../DAO/services";
import { validateUser } from "../middleware";
import session, { Session, SessionData } from "express-session";
import passport from "passport";

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
    }
}

const Service = new UserService();

export const sessionRouter = Express.Router();

sessionRouter.get("/login", (req: Request, res: Response) => {
    return res.render("login", {});
});

sessionRouter.get("/register", (req: Request, res: Response) => {
    return res.render("register", {});
});

sessionRouter.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

sessionRouter.get(
    "/githubcallback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    (req, res) => {
        req.session.user = req.user;
        // Successful authentication, redirect products
        res.redirect("/views/products");
    }
);

sessionRouter.get("/faillogin", (req: Request, res: Response) => {
    return res.json({ error: "failed to login" });
});

sessionRouter.get("/failregister", (req: Request, res: Response) => {
    return res.json({ error: "failed to register" });
});

sessionRouter.get("/logout", (req: Request, res: Response) => {
    (req.session as Session).destroy((err: Error | null) => {
        if (err) {
            return console.log(err);
        }
        return res.redirect("/api/sessions/login");
    });
});

sessionRouter.post(
    "/register",
    passport.authenticate("register", {
        failureRedirect: "/api/sessions/failregister",
    }),
    asyncHandler(async (req: Request, res: Response) => {
        if (!req.user) {
            res.json({ error: "something went wrong" });
        }
        (req.session as SessionData).user = req.user;
        return res.redirect("/api/sessions/login");
    })
);

sessionRouter.post(
    "/login",
    passport.authenticate("login", {
        failureRedirect: "/api/sessions/faillogin",
    }),
    asyncHandler(async (req: Request, res: Response) => {
        if (!req.user) {
            res.json({ error: "user not found" });
        }
        (req.session as SessionData).user = req.user;
        return res.redirect("/views/products");
    })
);

// sessionRouter.get("/profile", validateUser, (req: Request, res: Response) => {
//     const user = {
//         email: (req.session as SessionData).email,
//         isAdmin: (req.session as SessionData).isAdmin,
//         firstName: (req.session as SessionData).firstName,
//         lastName: (req.session as SessionData).lastName,
//     };
//     return res.render("profile", { user: user });
// });
