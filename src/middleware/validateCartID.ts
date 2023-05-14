import { Request, Response, NextFunction } from "express";

export const validateCartID = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { cid } = req.params;
    let id = cid;
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
