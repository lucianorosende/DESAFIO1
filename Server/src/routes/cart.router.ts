import Express, { Request, Response } from "express";
import { asyncHandler, httpStatus } from "../utils";
import { newCart } from "../DAO/Manager";
import { validateCartID, validateProductID } from "../middleware";

export const cartRouter = Express.Router();

cartRouter.get(
    "/:cid",
    validateCartID,
    asyncHandler(async (req: Request, res: Response) => {
        const { cid } = req.params;
        let getCartID = await newCart.getCartById(Number(cid));

        if (getCartID) {
            res.status(httpStatus.Ok).json({
                status: "success",
                msg: `This is the cart with id: ${cid}`,
                data: getCartID.products,
            });
        } else {
            res.status(httpStatus.NotFound).json({
                status: "error",
                msg: "httpStatus.NotFound cart not found",
                data: {},
            });
        }
    })
);

cartRouter.post(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const addCart = await newCart.addCart();
        res.status(httpStatus.Ok).json({
            status: "success",
            msg: "Cart added successfully",
            data: addCart,
        });
    })
);

cartRouter.post(
    "/:cid/product/:pid",
    validateCartID,
    validateProductID,
    asyncHandler(async (req: Request, res: Response) => {
        const { cid, pid } = req.params;
        const addProductInCart = await newCart.addProductInCart(
            Number(cid),
            Number(pid)
        );
        if (addProductInCart !== undefined) {
            res.status(httpStatus.Ok).json({
                status: "success",
                msg: "Product added successfully into cart",
                data: addProductInCart,
            });
        } else {
            res.status(httpStatus.NotFound).json({
                status: "error",
                msg: "Product was not added successfully",
                data: {},
            });
        }
    })
);
