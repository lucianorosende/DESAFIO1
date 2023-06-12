import Express from "express";
import { newProduct } from "../DAO/Manager";
import { asyncHandler } from "../utils";
import { ProductService } from "../DAO/services";

const Service = new ProductService();

export const viewsRouter = Express.Router();

viewsRouter.get(
    "/products",
    asyncHandler(async (req, res) => {
        const { category, stock, limit, pages, sort } = req.query;
        let getProds = await Service.getProductsQueries(
            category as string,
            Number(stock),
            limit as string,
            pages as string,
            sort as string
        );
        let paginateData = {
            status: getProds.status,
            totalPages: getProds.totalPages,
            prevPage: getProds.prevPage,
            nextPage: getProds.nextPage,
            page: getProds.page,
            hasPrevPage: getProds.hasPrevPage,
            hasNextPage: getProds.hasNextPage,
            prevLink: getProds.prevPage,
            nextLink: getProds.nextPage,
        };
        res.render("products", {
            prod: getProds.payload,
            pagination: paginateData,
        });
    })
);
