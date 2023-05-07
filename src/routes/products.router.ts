import Express, { Request, Response } from "express";
import { asyncHandler } from "../functions";
import { newProduct } from "../classes/";
import { Product } from "../types";

export const productRouter = Express.Router();

productRouter.get(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const { limit } = req.query;
        let readProducts: Product[] = await newProduct.getProducts();
        let numLimit: number = Number(limit);
        let newArr: Product[] = readProducts.slice(0, numLimit);
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

productRouter.get(
    "/:pid",
    asyncHandler(async (req: Request, res: Response) => {
        const { pid } = req.params;
        let getProductsID: Product = await newProduct.getProductById(
            Number(pid)
        );
        if (getProductsID) {
            res.status(200).json({
                status: "success",
                msg: `This is the product with id: ${pid}`,
                data: getProductsID,
            });
        } else {
            res.status(404).json({
                status: "error",
                msg: "404 product not found",
                data: {},
            });
        }
    })
);

productRouter.post(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const addData: boolean = await newProduct.addProduct(req.body);
        const checkProduct: boolean = newProduct.checkIfProductIsCorrect(
            req.body
        );
        if (addData) {
            res.status(200).json({
                status: "success",
                msg: `You added a new product!`,
                data: req.body,
            });
        } else if (!checkProduct) {
            res.status(400).json({
                status: "error",
                msg: "Need to add all fields to the product!",
                data: {},
            });
        } else {
            res.status(400).json({
                status: "error",
                msg: "Product is repeated!",
                data: {},
            });
        }
    })
);
