import Express from "express";
import { asyncHandler } from "../utils";
import { ProductService, CartService } from "../DAO/services";

const ServiceProducts = new ProductService();
const ServiceCarts = new CartService();

export const viewsRouter = Express.Router();

viewsRouter.get(
    "/products",
    asyncHandler(async (req, res) => {
        const { category, stock, limit, pages, sort } = req.query;
        let getProds = await ServiceProducts.getProductsQueries(
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

viewsRouter.get(
    "/carts/:cid",
    asyncHandler(async (req, res) => {
        const { cid } = req.params;
        let getCart = await ServiceCarts.getCartByIdAndPopulate(Number(cid));
        const formattedData = getCart[0].products.map((item) => ({
            title: item._id?.title,
            description: item._id?.description,
            price: item._id?.price,
            thumbnails: item._id?.thumbnails,
            code: item._id?.code,
            stock: item._id?.stock,
            status: item._id?.status,
            category: item._id?.category,
            quantity: item.quantity,
            pID: item.pID,
        }));
        res.render("cart", {
            cart: formattedData,
        });
    })
);

viewsRouter.get(
    "/productsReact",
    asyncHandler(async (req, res) => {
        const { category, stock, limit, pages, sort } = req.query;
        let getProds = await ServiceProducts.getProductsQueries(
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
        res.status(200).json({
            prod: getProds.payload,
            pagination: paginateData,
        });
    })
);
