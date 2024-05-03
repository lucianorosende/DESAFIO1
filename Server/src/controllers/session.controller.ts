import { Request, Response } from "express";
import session, { Session, SessionData } from "express-session";
import { customRequest, httpStatus, logger } from "../utils";
import { ProductsService, SessionsService, CartsService } from "../services";
import { UsersService } from "../services";

class SessionController {
    async githubCB(req: Request, res: Response) {
        const find = await UsersService.findUserById(req.session.passport.user);
        const update = await UsersService.updateConnection(find?.email);
        req.session.passport.user = find;
        res.redirect("http://localhost:5173");
    }
    renderFailLogin(req: Request, res: Response) {
        return res.json({ error: "failed to login" });
    }
    renderFailRegister(req: Request, res: Response) {
        return res.json({ error: "failed to register" });
    }
    async destroySession(req: Request, res: Response) {
        const find = await UsersService.findUserById(req.session.passport.user);
        const update = await UsersService.updateConnection(find?.email);
        res.cookie("connect.sid", "", { maxAge: 0 });
        req.session.destroy((err: Error | null) => {
            if (err) {
                return logger.error(err);
            }
            customRequest(
                res,
                httpStatus.Ok,
                "success",
                "You have Logged Out",
                []
            );
        });
    }
    async register(req: Request, res: Response) {
        if (!req.user) {
            res.json({ error: "something went wrong" });
        }
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "You have Registered!",
            req.session.passport.user
        );
    }
    async login(req: Request, res: Response) {
        if (!req.user) {
            res.json({ error: "user not found" });
        }
        const find = await UsersService.findUserById(req.session.passport.user);
        const update = await UsersService.updateConnection(find?.email);
        req.session.passport.user = find;
        customRequest(res, httpStatus.Ok, "success", "You have logged in!", []);
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
    async isLogged(req: Request, res: Response) {
        res.json("is logged");
    }
    async getLoginData(req: Request, res: Response) {
        const find = await UsersService.findUserById(req.session.passport.user);
        let data = {
            firstName: find?.firstName,
            lastName: find?.lastName,
            email: find?.email,
            admin: find?.isAdmin,
            role: find?.role,
            cartID: find?.cartID,
        };
        customRequest(res, httpStatus.Ok, "success", "User Data", data);
    }
}

export const SessionsController = new SessionController();
