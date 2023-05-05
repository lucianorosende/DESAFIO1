import { NextFunction, Request, Response } from "express";

export function asyncHandler(fn: Function) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: "error",
                msg: "Server internal error",
                data: {},
            });
        }
    };
}
