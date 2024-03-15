import { Request, Response } from "express";
import session, { Session, SessionData } from "express-session";
import { logger } from "../utils";
import { UserMongooseModel } from "../DAO/MONGO";
import { sendMail } from "../utils/sendMail";
import { createHash } from "../utils";
import { SessionsService } from "../services/session.services";
import { IUser } from "../interfaces";
import { UsersService } from "../services";
import jwt from "jsonwebtoken";

class SessionController {
    renderLogin(req: Request, res: Response) {
        return res.render("login", {});
    }
    renderRegister(req: Request, res: Response) {
        return res.render("register", {});
    }
    async githubCB(req: Request, res: Response) {
        req.session.user = req.user;
        const update = await UsersService.updateConnection(
            req.session.user.email
        );
        return res.redirect("/views/products");
    }
    renderFailLogin(req: Request, res: Response) {
        return res.json({ error: "failed to login" });
    }
    renderFailRegister(req: Request, res: Response) {
        return res.json({ error: "failed to register" });
    }
    async destroySession(req: Request, res: Response) {
        const update = await UsersService.updateConnection(
            req.session.passport.user.email
        );
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
        // req.session.user = req.user;
        const update = await UsersService.updateConnection(
            (req.session as SessionData).passport.user.email
        );
        console.log(req.session.id);
        // res.cookie("session", req.session);
        // res.send({ test: "test" });
        res.redirect("/views/products");
    }
    async recoverPass(req: Request, res: Response) {
        const recover = await SessionsService.recoverPassword(req);
        res.redirect("/views/checkEmail");
    }
    async emailRecovery(req: Request, res: Response) {
        const recover = await SessionsService.emailRecovery(req);
        if (recover && Date.now() < recover.expire) {
            res.render("changePass", { email: recover.email });
        } else {
            res.send("error");
        }
    }
    async changePass(req: Request, res: Response) {
        const pass = await SessionsService.changePass(req);
        res.render("password-success");
    }
}

export const SessionsController = new SessionController();
