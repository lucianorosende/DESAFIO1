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
        res.status(200).json({
            status: "success",
            msg: "Cart added successfully",
            data: addCart,
        });
    })
);

cartRouter.post(
    "/:cid/product/:pid",
    asyncHandler(async (req: Request, res: Response) => {
        const { cid, pid } = req.params;
        const addProductInCart = await newCart.addProductInCart(
            Number(cid),
            Number(pid)
        );
        if (addProductInCart !== undefined) {
            res.status(200).json({
                status: "success",
                msg: "Product added successfully into cart",
                data: addProductInCart,
            });
        } else {
            res.status(404).json({
                status: "error",
                msg: "Product was not added successfully",
                data: {},
            });
        }
    })
);
