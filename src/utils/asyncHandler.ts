import { NextFunction, Request, Response, RequestHandler } from "express";
import { TAsyncRequestHandler } from "../types";
import { httpStatus, logger } from ".";

export function asyncHandler(fn: TAsyncRequestHandler): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            await fn(req, res, next);
        } catch (err) {
            logger.error(err);
            res.status(httpStatus.ServerError).json({
                status: "error",
                msg: "Server internal error",
                data: {},
            });
        }
    };
}
