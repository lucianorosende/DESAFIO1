import { newProduct } from "./src";
import Express from "express";

const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`server up on ${PORT}`);
});

app.get("/products/", async (req: any, res: any) => {
    let readProducts = await newProduct.getProducts();
    let limit = parseInt(req.query.limit);
    let newArr = readProducts.slice(0, limit);
    if (limit < readProducts.length) {
        res.status(200).json({ newArr });
    } else if (limit > readProducts.length) {
        res.status(400).json({ error: "limit exceeded" });
    } else {
        res.status(200).json({ readProducts });
    }
});

app.get("/products/:pid", async (req: any, res: any) => {
    let getProductsID = await newProduct.getProductById(
        parseInt(req.params.pid)
    );

    if (!getProductsID) {
        res.status(404).json({ 404: "Product not found" });
    } else {
        res.status(200).json({ getProductsID });
    }
});

app.on("error", (err) => console.log("server error: " + err));
