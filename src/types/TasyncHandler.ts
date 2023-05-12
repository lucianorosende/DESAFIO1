import { NextFunction, Request, Response } from "express";

export type TAsyncRequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>;
