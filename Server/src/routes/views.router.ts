import Express from "express";
import { newProduct } from "../classes";
import { asyncHandler } from "../utils";

export const viewsRouter = Express.Router();

viewsRouter.get(
    "/home",
    asyncHandler(async (req, res) => {
        let getProds = await newProduct.getProducts();
        res.render("home", { prod: getProds });
    })
);

viewsRouter.get(
    "/realtimeproducts",
    asyncHandler(async (req, res) => {
        let getProds = await newProduct.getProducts();
        res.render("realTimeProducts", { prod: getProds });
    })
);
