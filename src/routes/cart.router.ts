import Express, { Request, Response } from "express";
import { asyncHandler } from "../functions";
import { newCart } from "../classes";

export const cartRouter = Express.Router();

cartRouter.get(
    "/:cid",
    asyncHandler(async (req: Request, res: Response) => {
        const { cid } = req.params;
        let getCartID = await newCart.getCartById(Number(cid));

        if (getCartID) {
            res.status(200).json({
                status: "success",
                msg: `This is the cart with id: ${cid}`,
                data: getCartID.products,
            });
        } else {
            res.status(404).json({
                status: "error",
                msg: "404 cart not found",
                data: {},
            });
        }
    })
);

cartRouter.post(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const addCart = await newCart.addCart();
        const getCart = await newCart.getCart();
        res.status(200).json({
            status: "success",
            msg: "Cart added successfully",
            data: getCart,
        });
    })
);
