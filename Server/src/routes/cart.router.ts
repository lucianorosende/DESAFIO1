import Express, { Request, Response } from "express";
import { asyncHandler, httpStatus, customRequest } from "../utils";
import { validateCartID, validateProductID } from "../middlewares";
import { CartsService } from "../services";
import { CartsController } from "../controllers/cart.controller";

export const cartRouter = Express.Router();

cartRouter.get("/", asyncHandler(CartsController.getAll));

cartRouter.get("/:cid", validateCartID, asyncHandler(CartsController.getById));

cartRouter.get(
    "/:cid/populate",
    validateCartID,
    asyncHandler(CartsController.getAndPopulate)
);

cartRouter.get("/:cid/purchase", asyncHandler(CartsController.purchase));

cartRouter.post("/", asyncHandler(CartsController.create));

cartRouter.post(
    "/:cid/product/:pid",
    validateCartID,
    validateProductID,
    asyncHandler(CartsController.addProductIntoCart)
);

cartRouter.put("/:cid", asyncHandler(CartsController.updateProductFromCart));

cartRouter.put(
    "/:cid/products/:pid",
    asyncHandler(CartsController.updateQuantity)
);

cartRouter.delete(
    "/:cid/products/:pid",
    asyncHandler(CartsController.deleteProductFromCart)
);

cartRouter.delete(
    "/:cid",
    asyncHandler(CartsController.deleteAllProductsFromCart)
);

cartRouter.delete("/", asyncHandler(CartsController.deleteAll));
