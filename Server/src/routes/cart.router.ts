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
                msg: "No Carts available",
                data: getCarts,
            });
        } else {
            res.status(httpStatus.Ok).json({
                status: "success",
                msg: "List of Carts",
                data: getCarts,
            });
        }
    })
);

cartRouter.get(
    "/:cid",
    validateCartID,
    asyncHandler(async (req: Request, res: Response) => {
        const { cid } = req.params;
        let getProductsID = await Service.getCartById(Number(cid));
        if (getProductsID.length === 0) {
            res.status(httpStatus.NotFound).json({
                status: "error",
                msg: `We didn't find a Cart for your id`,
                data: getProductsID,
            });
        } else {
            res.status(httpStatus.Ok).json({
                status: "success",
                msg: `This is the Cart with id: ${cid}`,
                data: getProductsID,
            });
        }
    })
);

cartRouter.get(
    "/:cid/populate",
    validateCartID,
    asyncHandler(async (req: Request, res: Response) => {
        const { cid } = req.params;
        let getProductsID = await Service.getCartByIdAndPopulate(Number(cid));
        if (getProductsID.length === 0) {
            res.status(httpStatus.NotFound).json({
                status: "error",
                msg: `We didn't find a Cart for your id`,
                data: getProductsID,
            });
        } else {
            res.status(httpStatus.Ok).json({
                status: "success",
                msg: `This is the Cart with id: ${cid}`,
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
        const addProductInCart = await Service.addProductInCart(
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

cartRouter.put(
    "/:cid",
    asyncHandler(async (req: Request, res: Response) => {
        const { cid } = req.params;
        const updateCart = await Service.updateProductsFromCart(
            Number(cid),
            req.body
        );
        res.status(httpStatus.Ok).json({
            status: "success",
            msg: "products updated successfully",
            data: updateCart,
        });
    })
);

cartRouter.put(
    "/:cid/products/:pid",
    asyncHandler(async (req: Request, res: Response) => {
        const { cid, pid } = req.params;
        const updateCart = await Service.UpdateQuantityProduct(
            Number(cid),
            Number(pid),
            req.body
        );
        res.status(httpStatus.Ok).json({
            status: "success",
            msg: "products updated successfully",
            data: updateCart,
        });
    })
);

cartRouter.delete(
    "/:cid/products/:pid",
    asyncHandler(async (req: Request, res: Response) => {
        const { cid, pid } = req.params;
        const deleteProducts = await Service.deleteProductFromCart(
            Number(cid),
            Number(pid)
        );
        res.status(httpStatus.Ok).json({
            status: "success",
            msg: "products deleted successfully",
            data: deleteProducts,
        });
    })
);

cartRouter.delete(
    "/:cid",
    asyncHandler(async (req: Request, res: Response) => {
        const { cid, pid } = req.params;
        const deleteData = await Service.deleteAllProductsFromCart(Number(cid));
        res.status(httpStatus.Ok).json({
            status: "success",
            msg: "Carts deleted successfully",
            data: deleteData,
        });
    })
);

cartRouter.delete(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const deleteData = await Service.deleteAllCarts();
        res.status(httpStatus.Ok).json({
            status: "success",
            msg: "Carts deleted successfully",
            data: [],
        });
    })
);
