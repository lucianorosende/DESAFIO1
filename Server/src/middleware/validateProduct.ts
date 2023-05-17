import { NextFunction, Response, Request } from "express";
export const validateProduct = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const keysBody: String[] = Object.keys(req.body);
    const requiredKeys: String[] = [
        "title",
        "description",
        "code",
        "price",
        "stock",
        "category",
        "status",
    ];
    const isValidRequest: boolean = requiredKeys.every((key) =>
        keysBody.includes(key)
    );
    if (!isValidRequest) {
        res.status(400).json({
            status: "error",
            msg: "Need to add all fields to the product!",
            data: {},
        });
        return;
    }

    next();
};
