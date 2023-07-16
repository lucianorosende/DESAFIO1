import Express, { Request, Response } from "express";
import { asyncHandler, httpStatus, customRequest } from "../utils";
import { validateProductID } from "../middleware";
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
            customRequest(
                res,
                httpStatus.Error,
                "error",
                "List of products",
                readProductsQueries
            );
        } else {
            customRequest(
                res,
                httpStatus.Ok,
                "success",
                "List of products",
                readProductsQueries
            );
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
            customRequest(
                res,
                httpStatus.NotFound,
                "error",
                `We didn't find a product for your id`,
                getProductsID
            );
        } else {
            customRequest(
                res,
                httpStatus.Ok,
                "success",
                `This is the product with id: ${pid}`,
                getProductsID
            );
        }
    })
);

productRouter.post(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const addData = await Service.addProduct(req.body);
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            `You added a new product!`,
            req.body
        );
    })
);

productRouter.put(
    "/:pid",
    validateProductID,
    asyncHandler(async (req: Request, res: Response) => {
        const { pid } = req.params;
        const updateData = await Service.updateProduct(Number(pid), req.body);
        if (updateData.modifiedCount > 0) {
            customRequest(
                res,
                httpStatus.Ok,
                "success",
                "data updated successfully",
                {}
            );
        } else {
            customRequest(
                res,
                httpStatus.Error,
                "error",
                "Product not updated successfully",
                {}
            );
        }
    })
);

productRouter.delete(
    "/:pid",
    validateProductID,
    asyncHandler(async (req: Request, res: Response) => {
        const { pid } = req.params;
        const deleteData = await Service.deleteProductById(Number(pid));
        if (deleteData.deletedCount > 0) {
            customRequest(
                res,
                httpStatus.Ok,
                "success",
                "product deleted successfully",
                {}
            );
        } else {
            customRequest(
                res,
                httpStatus.Error,
                "error",
                "No product found to delete",
                {}
            );
        }
    })
);

productRouter.delete(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const deleteData = await Service.deleteAllProducts();
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "products deleted successfully",
            {}
        );
    })
);
