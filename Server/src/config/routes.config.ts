import { app } from "../server";
import {
    productRouter,
    cartRouter,
    sessionRouter,
    userRouter,
} from "../routes";

export function routes(): void {
    app.use("/api/sessions", sessionRouter);
    app.use("/api/products", productRouter);
    app.use("/api/carts", cartRouter);
    app.use("/api/users", userRouter);
}
