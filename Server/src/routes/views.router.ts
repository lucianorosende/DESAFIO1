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

viewsRouter.get("/current", asyncHandler(ViewsController.renderCurrent));

viewsRouter.get("/messages", asyncHandler(ViewsController.renderMessages));

viewsRouter.get(
    "/recover-pass",
    asyncHandler(ViewsController.renderRecoverPass)
);
viewsRouter.get("/checkEmail", asyncHandler(ViewsController.renderEmail));

viewsRouter.get(
    "/createProduct",
    validateAdmin,
    asyncHandler(ViewsController.renderCreateProduct)
);

viewsRouter.get(
    "/updateProduct/:pid",
    validateAdmin,
    asyncHandler(ViewsController.renderUpdateProduct)
);

viewsRouter.get(
    "/changeRole",
    validateUser,
    asyncHandler(ViewsController.renderChangeRole)
);

viewsRouter.get(
    "/accounts",
    validateUser,
    asyncHandler(ViewsController.renderAccounts)
);
