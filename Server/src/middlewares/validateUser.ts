import { Request, Response, NextFunction } from "express";

export function validateUser(req: Request, res: Response, next: NextFunction) {
    if ((req.session as any).passport.user.email) {
        return next();
    }
    return res.send("auth error");
}
