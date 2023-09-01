import { Request, Response } from "express";
import session, { Session, SessionData } from "express-session";
import { logger } from "../utils";
import { sendMail } from "../utils/sendMail";

class SessionController {
    renderLogin(req: Request, res: Response) {
        return res.render("login", {});
    }
    renderRegister(req: Request, res: Response) {
        return res.render("register", {});
    }
    githubCB(req: Request, res: Response) {
        req.session.user = req.user;
        return res.redirect("/views/products");
    }
    renderFailLogin(req: Request, res: Response) {
        return res.json({ error: "failed to login" });
    }
    renderFailRegister(req: Request, res: Response) {
        return res.json({ error: "failed to register" });
    }
    destroySession(req: Request, res: Response) {
        (req.session as Session).destroy((err: Error | null) => {
            if (err) {
                return logger.error(err);
            }
            return res.redirect("/api/sessions/login");
        });
    }
    async register(req: Request, res: Response) {
        if (!req.user) {
            res.json({ error: "something went wrong" });
        }
        (req.session as SessionData).user = req.user;
        return res.redirect("/api/sessions/login");
    }
    async login(req: Request, res: Response) {
        if (!req.user) {
            res.json({ error: "user not found" });
        }
        (req.session as SessionData).user = req.user;
        return res.redirect("/views/products");
    }
}

export const SessionsController = new SessionController();
