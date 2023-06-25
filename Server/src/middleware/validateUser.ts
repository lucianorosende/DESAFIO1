import { Request, Response, NextFunction } from "express";

export function validateUser(req: Request, res: Response, next: NextFunction) {
    if (req.session?.email) {
        return next();
    }
    return res.send("auth error");
}
