import Express from "express";
import { asyncHandler } from "../utils";
import { validateProductID, validateAdmin } from "../middlewares";
import { ProductsController } from "../controllers";

export const productRouter = Express.Router();

productRouter.get("/all", asyncHandler(ProductsController.getAllProducts));
productRouter.get("/", asyncHandler(ProductsController.getAll));
productRouter.get(
    "/:pid",
    validateProductID,
    asyncHandler(ProductsController.getById)
);
productRouter.post(
    "/",
    // validateAdmin,
    asyncHandler(ProductsController.create)
);

productRouter.post(
    "/:pid",
    validateProductID,
    validateAdmin,
    asyncHandler(ProductsController.update)
);

productRouter.put(
    "/:pid",
    validateProductID,
    validateAdmin,
    asyncHandler(ProductsController.update)
);

productRouter.delete(
    "/:pid",
    validateProductID,
    validateAdmin,
    asyncHandler(ProductsController.deleteOne)
);

productRouter.delete(
    "/",
    // validateAdmin,
    asyncHandler(ProductsController.deleteAll)
);
