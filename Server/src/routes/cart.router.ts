import Express, { Request, Response } from "express";
import { asyncHandler, httpStatus, customRequest } from "../utils";
import { validateCartID, validateProductID } from "../middleware";
import { CartService } from "../DAO/services/carts.services";

let Service = new CartService();

export const cartRouter = Express.Router();

cartRouter.get(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const getCarts = await Service.getCarts();
        if (getCarts.length === 0) {
            customRequest(
                res,
                httpStatus.Error,
                "error",
                "No Carts available",
                getCarts
            );
        } else {
            customRequest(
                res,
                httpStatus.Error,
                "success",
                "List of Carts",
                getCarts
            );
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
            customRequest(
                res,
                httpStatus.NotFound,
                "error",
                `We didn't find a Cart for your id`,
                getProductsID
            );
        } else {
            customRequest(
                res,
                httpStatus.Ok,
                "success",
                `This is the Cart with id: ${cid}`,
                getProductsID
            );
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
            customRequest(
                res,
                httpStatus.NotFound,
                "error",
                `We didn't find a Cart for your id`,
                getProductsID
            );
        } else {
            customRequest(
                res,
                httpStatus.Ok,
                "success",
                `This is the Cart with id: ${cid}`,
                getProductsID
            );
        }
    })
);

cartRouter.post(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const addCart = await Service.addCart();
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "Cart added successfully",
            addCart
        );
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
            customRequest(
                res,
                httpStatus.Ok,
                "success",
                "Product added successfully into cart",
                addProductInCart
            );
        } else {
            customRequest(
                res,
                httpStatus.NotFound,
                "error",
                "Product was not added successfully",
                {}
            );
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
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "products updated successfully",
            {}
        );
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
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "products updated successfully",
            updateCart
        );
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
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "products updated successfully",
            deleteProducts
        );
    })
);

cartRouter.delete(
    "/:cid",
    asyncHandler(async (req: Request, res: Response) => {
        const { cid, pid } = req.params;
        const deleteData = await Service.deleteAllProductsFromCart(Number(cid));
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "Carts deleted successfully",
            deleteData
        );
    })
);

cartRouter.delete(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const deleteData = await Service.deleteAllCarts();
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "Carts deleted successfully",
            []
        );
    })
);
