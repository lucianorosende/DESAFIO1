import { NextFunction, Request, Response, RequestHandler } from "express";
import { AsyncRequestHandler } from "../types";

export function asyncHandler(fn: AsyncRequestHandler): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
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
