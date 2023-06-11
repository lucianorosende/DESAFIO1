import { Request, Response, NextFunction } from "express";
import { httpStatus } from "../utils";

export const validateProductID = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { pid } = req.params;
    let id: string = pid;
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
