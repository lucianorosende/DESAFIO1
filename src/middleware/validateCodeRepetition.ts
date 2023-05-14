import { Request, Response, NextFunction } from "express";
import { newProduct } from "../classes";
import { asyncHandler } from "../functions";
export const validateCodeRepetition = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { code } = req.body;
        const readProdCode: boolean = await newProduct.validateCodeRepetition(
            code
        );
        if (readProdCode) {
            res.status(400).json({
                status: "error",
                msg: `Product code already exists: ${code}`,
                data: {},
            });
            return;
        }
        next();
    }
);
