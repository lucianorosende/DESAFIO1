import { app } from "../server";
import { userRouter } from "../routes/users.router";
import { sessionRouter } from "../routes/session.router";
import { cartRouter } from "../routes/cart.router";
import { productRouter } from "../routes/products.router";

export function routes(): void {
    app.use("/api/sessions", sessionRouter);
    app.use("/api/products", productRouter);
    app.use("/api/carts", cartRouter);
    app.use("/api/users", userRouter);
}
