import { Request, Response, NextFunction } from "express";

export const validateProductID = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { pid } = req.params;
    let id = pid;
    if (!id || isNaN(Number(id))) {
        res.status(400).json({
            status: "error",
            msg: `Invalid ID: ${id}`,
            data: {},
        });
        return;
    } else {
        next();
    }
};
