import Express from "express";
import { asyncHandler } from "../utils";
import { validateProductID, validateAdmin } from "../middlewares";
import { ProductsController } from "../controllers";

export const productRouter = Express.Router();

productRouter.get("/", asyncHandler(ProductsController.getAll));
productRouter.get(
    "/:pid",
    validateProductID,
    asyncHandler(ProductsController.getById)
);
productRouter.post("/", validateAdmin, asyncHandler(ProductsController.create));

productRouter.put(
    "/:pid",
    validateProductID,
    asyncHandler(ProductsController.update)
);

productRouter.delete(
    "/:pid",
    validateProductID,
    asyncHandler(ProductsController.deleteOne)
);

productRouter.delete("/", asyncHandler(ProductsController.deleteAll));
