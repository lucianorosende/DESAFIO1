import { Request, Response } from "express";
import session, { Session, SessionData } from "express-session";
import { logger } from "../utils";
import { v4 as uuidv4 } from "uuid";
import { RecoverCodeMongooseModel } from "../DAO/MONGO/models/recover-code.model";
import { UserMongooseModel } from "../DAO/MONGO";
import { sendMail } from "../utils/sendMail";
import { createHash } from "../utils";

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
    async recoverPass(req: Request, res: Response) {
        const { email } = req.body;
        const code = uuidv4();
        const codeCreated = await RecoverCodeMongooseModel.create({
            email,
            code,
            expire: Date.now() + 3600000,
        });
        sendMail(
            "zickz4gbusiness@gmail.com",
            email,
            "Reactivation code",
            `<div>Click <a href="http://localhost:8080/api/sessions/email-recovery?code=${code}&email=${email}">aqui</a> para reactivar tu contraseña</div>`
        );
        res.redirect("/views/checkEmail");
    }
    async emailRecovery(req: Request, res: Response) {
        const { code, email } = req.query;
        const findCode = await RecoverCodeMongooseModel.findOne({
            code,
            email,
        });
        if (findCode && Date.now() < findCode.expire) {
            res.render("changePass", { email: email });
        } else {
            res.send("error");
        }
    }
    async changePass(req: Request, res: Response) {
        const { email, password } = req.body;
        const newPassword = createHash(password);
        const findUser = await UserMongooseModel.updateOne(
            { email: email },
            { password: newPassword }
        );
        res.render("password-success");
    }
}

export const SessionsController = new SessionController();
