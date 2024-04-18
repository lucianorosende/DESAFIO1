import Express from "express";
import { asyncHandler } from "../utils";
import { validateProductID, validateAdmin } from "../middlewares";
import { ProductsController } from "../controllers";

export const productRouter = Express.Router();

productRouter.get("/all", asyncHandler(ProductsController.getAllProducts));
productRouter.get(
    "/categories",
    asyncHandler(ProductsController.getCategoriesProducts)
);
productRouter.get(
    "/category/:category",
    asyncHandler(ProductsController.getCategoriesAll)
);

productRouter.get("/", asyncHandler(ProductsController.getAll));
productRouter.get(
    "/mockingproducts",
    asyncHandler(ProductsController.getMockedProducts)
);
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

productRouter.delete(
    "/:pid",
    validateProductID,
    // validateAdmin,
    asyncHandler(ProductsController.deleteOne)
);

productRouter.delete(
    "/",
    // validateAdmin,
    asyncHandler(ProductsController.deleteAll)
);
