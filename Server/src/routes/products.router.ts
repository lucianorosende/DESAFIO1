import Express, { Request, Response } from "express";
import { asyncHandler, httpStatus } from "../utils";
import {
    validateCodeRepetition,
    validateProduct,
    validateProductID,
} from "../middleware";
import { ProductService } from "../DAO/services/";

export const productRouter = Express.Router();
const Service = new ProductService();

productRouter.get(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const { category, stock, limit, pages, sort } = req.query;
        const readProductsQueries = await Service.getProductsQueries(
            category as string,
            Number(stock),
            limit as string,
            pages as string,
            sort as string
        );
        if (readProductsQueries.status === "error") {
            res.status(httpStatus.Error).json({
                status: "error",
                msg: "List of products",
                data: readProductsQueries,
            });
        } else {
            res.status(httpStatus.Ok).json({
                status: "success",
                msg: "List of products",
                data: readProductsQueries,
            });
        }
    })
);

productRouter.get(
    "/:pid",
    validateProductID,
    asyncHandler(async (req: Request, res: Response) => {
        const { pid } = req.params;
        let getProductsID = await Service.getProductById(Number(pid));

        if (getProductsID.length === 0) {
            res.status(httpStatus.NotFound).json({
                status: "error",
                msg: `We didn't find a product for your id`,
                data: getProductsID,
            });
        } else {
            res.status(httpStatus.Ok).json({
                status: "success",
                msg: `This is the product with id: ${pid}`,
                data: getProductsID,
            });
        }
    })
);

productRouter.post(
    "/", // TODO: NEW MIDDLEWARES WITH MONGODB
    asyncHandler(async (req: Request, res: Response) => {
        const addData = await Service.addProduct(req.body);
        res.status(httpStatus.Ok).json({
            status: "success",
            msg: `You added a new product!`,
            data: req.body,
        });
    })
);

productRouter.put(
    "/:pid",
    validateProductID,
    // TODO: MAKE NEW MIDDLEWARES FOR MONGODB
    asyncHandler(async (req: Request, res: Response) => {
        const { pid } = req.params;
        const updateData = await Service.updateProduct(Number(pid), req.body);
        // if (updateData.modifiedCount > 0) {
        res.status(httpStatus.Ok).json({
            status: "success",
            msg: "data updated successfully",
            data: {},
        });
        // } else {
        //     res.status(httpStatus.Error).json({
        //         status: "error",
        //         msg: "Product not updated successfully",
        //         data: {},
        //     });
        // }
    })
);

productRouter.delete(
    "/:pid",
    validateProductID,
    asyncHandler(async (req: Request, res: Response) => {
        const { pid } = req.params;
        const deleteData = await Service.deleteProductById(Number(pid));
        console.log(deleteData);
        if (deleteData.deletedCount > 0) {
            res.status(httpStatus.Ok).json({
                status: "success",
                msg: "product deleted successfully",
                data: {},
            });
        } else {
            res.status(httpStatus.Ok).json({
                status: "error",
                msg: "No product found to delete",
                data: {},
            });
        }
    })
);

productRouter.delete(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const deleteData = await Service.deleteAllProducts();
        res.status(httpStatus.Ok).json({
            status: "success",
            msg: "products deleted successfully",
            data: [],
        });
    })
);
