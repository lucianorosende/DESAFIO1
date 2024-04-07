import { Request, Response } from "express";
import session, { Session, SessionData } from "express-session";
import { customRequest, httpStatus, logger } from "../utils";
import { ProductsService, ViewsService, SessionsService } from "../services";
import { UsersService } from "../services";

class SessionController {
    async githubCB(req: Request, res: Response) {
        const update = await UsersService.updateConnection(
            req.session.passport.user.email
        );
        return res.redirect("http://localhost:5173/home");
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
        const update = await UsersService.updateConnection(
            (req.session as SessionData).passport.user.email
        );
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
        let getProds = await ProductsService.getProductsQueries(req.query);
        let paginateData = await ViewsService.productData(getProds);
        let user = await UsersService.findUserById(
            req.session.passport.user._id
        );
        let data = {
            prod: getProds.payload,
            pagination: paginateData,
            firstName: req.session.passport.user.firstName,
            lastName: req.session.passport.user.lastName,
            email: req.session.passport.user.email,
            admin: req.session.passport.user.isAdmin,
            role: user?.role,
        };
        customRequest(res, httpStatus.Ok, "success", "User Data", data);
    }
}

export const SessionsController = new SessionController();
