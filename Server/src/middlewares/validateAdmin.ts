import { Request, Response, NextFunction } from "express";

export function validateAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.session.user.isAdmin || req.session.user.role === "premium") {
        return next();
    }
    return res.send("auth error");
}
