import { productRouter, cartRouter } from "./routes";
import Express, { Request, Response } from "express";

// Initializing Express -------------------------------------------------------------------------------------------------------------
const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
const PORT: number = 8080;

app.listen(PORT, () => {
    console.log(`server up on ${PORT}`);
});

// Initializing Routes --------------------------------------------------------------------------------------------------------------
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// Handling Errors ------------------------------------------------------------------------------------------------------------------
app.on("error", (err) => console.log("server error: " + err));

app.get("*", (req: Request, res: Response) => {
    res.status(404).json({ status: "error", msg: "route not found", data: {} });
});

app.post("*", (req: Request, res: Response) => {
    res.status(404).json({ status: "error", msg: "route not found", data: {} });
});
