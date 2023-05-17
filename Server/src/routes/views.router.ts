import Express from "express";
import { newProduct } from "../classes";
import { socketServer } from "../server";

export const viewsRouter = Express.Router();

viewsRouter.get("/home", async (req, res) => {
    let getProds = await newProduct.getProducts();
    res.render("home", { prod: getProds });
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    let getProds = await newProduct.getProducts();
    res.render("realTimeProducts", { prod: getProds });
});
