import Express, { Request, Response } from "express";
import { asyncHandler, httpStatus } from "../utils";
import { newCart } from "../DAO/Manager";
import { validateCartID, validateProductID } from "../middleware";
import { CartService } from "../DAO/services/carts.services";

let Service = new CartService();

export const cartRouter = Express.Router();

cartRouter.get(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const getCarts = await Service.getCarts();
        if (getCarts.length === 0) {
            res.status(httpStatus.Error).json({
                status: "error",
                msg: "No Products available",
                data: getCarts,
            });
        } else {
            res.status(httpStatus.Ok).json({
                status: "success",
                msg: "List of products",
                data: getCarts,
            });
        }
    })
);

cartRouter.get(
    "/:cid",
    validateProductID,
    asyncHandler(async (req: Request, res: Response) => {
        const { cid } = req.params;
        let getProductsID = await Service.getCartById(Number(cid));
        if (getProductsID.length === 0) {
            res.status(httpStatus.NotFound).json({
                status: "error",
                msg: `We didn't find a product for your id`,
                data: getProductsID,
            });
        } else {
            res.status(httpStatus.Ok).json({
                status: "success",
                msg: `This is the product with id: ${cid}`,
                data: getProductsID,
            });
        }
    })
);

cartRouter.post(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const addCart = await Service.addCart();
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

cartRouter.delete(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const deleteData = await Service.deleteAllCarts();
        res.status(httpStatus.Ok).json({
            status: "success",
            msg: "products deleted successfully",
            data: [],
        });
    })
);
