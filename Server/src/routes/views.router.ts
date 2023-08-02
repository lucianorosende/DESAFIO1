import Express from "express";
import { asyncHandler } from "../utils";
import { ProductsService, CartsService } from "../services";
import { validateUser, validateAdmin } from "../middlewares";
import { ViewsController } from "../controllers";

export const viewsRouter = Express.Router();

viewsRouter.get(
    "/products",
    validateUser,
    asyncHandler(ViewsController.renderProducts)
);

viewsRouter.get("/carts/:cid", asyncHandler(ViewsController.renderCart));

viewsRouter.get(
    "/current",
    validateAdmin,
    asyncHandler(ViewsController.renderCurrent)
);

viewsRouter.get("/messages", asyncHandler(ViewsController.renderMessages));
