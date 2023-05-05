import { newProduct } from "./ProductManager";
import Express, { Request, Response } from "express";

const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

const PORT: number = 8080;

app.listen(PORT, () => {
    console.log(`server up on ${PORT}`);
});

app.get("/products/", async (req: Request, res: Response) => {
    const { limit } = req.query;
    let readProducts = await newProduct.getProducts();
    let numLimit = Number(limit);
    let newArr = readProducts.slice(0, numLimit);
    if (numLimit < readProducts.length) {
        res.status(200).json({ status: "success", data: newArr });
    } else if (numLimit > readProducts.length) {
        res.status(400).json({ status: "error", msg: "limit exceeded" });
    } else {
        res.status(200).json({ status: "success", data: readProducts });
    }
});

app.get("/products/:pid", async (req: Request, res: Response) => {
    const { pid } = req.params;
    let getProductsID = await newProduct.getProductById(Number(pid));
    if (!getProductsID) {
        res.status(404).json({ status: "error", msg: "404 product not found" });
    } else {
        res.status(200).json({ status: "success", data: getProductsID });
    }
});

app.on("error", (err) => console.log("server error: " + err));

app.get("*", (req: Request, res: Response) => {
    res.status(404).json({ status: "error", msg: "route not found" });
});
