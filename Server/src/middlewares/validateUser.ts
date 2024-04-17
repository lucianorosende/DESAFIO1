import { Request, Response, NextFunction } from "express";
import passport from "passport";

export function validateUser(req: Request, res: Response, next: NextFunction) {
    console.log(req.session);
    if ((req.session as any).passport?.user?.email) {
        return next();
    }
    return res.json("auth error");
}
