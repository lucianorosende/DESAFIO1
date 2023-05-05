import { newProduct } from "./classes/ProductManager";
import Express, { Request, Response } from "express";
import { asyncHandler } from "./functions";

const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

const PORT: number = 8080;

app.listen(PORT, () => {
    console.log(`server up on ${PORT}`);
});

app.get(
    "/products/",
    asyncHandler(async (req: Request, res: Response) => {
        const { limit } = req.query;
        let readProducts = await newProduct.getProducts();
        let numLimit = Number(limit);
        let newArr = readProducts.slice(0, numLimit);
        if (numLimit <= readProducts.length) {
            res.status(200).json({
                status: "success",
                msg: `This is the list of products with the limit of ${numLimit}`,
                data: newArr,
            });
        } else if (numLimit > readProducts.length) {
            res.status(400).json({
                status: "error",
                msg: "limit exceeded",
                data: {},
            });
        } else {
            res.status(200).json({
                status: "success",
                msg: "List of products",
                data: readProducts,
            });
        }
    })
);

app.get(
    "/products/:pid",
    asyncHandler(async (req: Request, res: Response) => {
        const { pid } = req.params;
        let getProductsID = await newProduct.getProductById(Number(pid));
        if (!getProductsID) {
            res.status(404).json({
                status: "error",
                msg: "404 product not found",
                data: {},
            });
        } else {
            res.status(200).json({
                status: "success",
                msg: `This is the product with id: ${pid}`,
                data: getProductsID,
            });
        }
    })
);

app.on("error", (err) => console.log("server error: " + err));

app.get("*", (req: Request, res: Response) => {
    res.status(404).json({ status: "error", msg: "route not found", data: {} });
});
