import { Request, Response, NextFunction } from "express";
import { httpStatus } from "../utils";

export const validateCartID = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { cid } = req.params;
    let id: string = cid;
    if (!id || isNaN(Number(id))) {
        res.status(httpStatus.Error).json({
            status: "error",
            msg: `Invalid ID: ${id}`,
            data: {},
        });
        return;
    } else {
        next();
    }
};
