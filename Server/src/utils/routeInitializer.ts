import { app } from "../server";
import { productRouter, cartRouter, viewsRouter } from "../routes";

export const routeInitializer = (): void => {
    app.use("/api/products", productRouter);
    app.use("/api/carts", cartRouter);
    app.use("/views", viewsRouter);
};
