import { ProductsService } from "../services";
import { customRequest } from "../utils";
import { httpStatus } from "../utils";
import { Request, Response } from "express";

class ProductController {
    async getAllProducts(req: Request, res: Response) {
        const prods = await ProductsService.getProducts();
        customRequest(res, httpStatus.Ok, "success", "List of products", prods);
    }
    async getCategoriesProducts(req: Request, res: Response) {
        const prods = await ProductsService.getProductsCategories();
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "List of categories",
            prods
        );
    }
    async getCategoriesAll(req: Request, res: Response) {
        const { category } = req.params;
        const prods = await ProductsService.getCategoriesAll(category);
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "List of categories",
            prods
        );
    }
    async getAll(req: Request, res: Response) {
        const readProductsQueries = await ProductsService.getProductsQueries(
            req.query
        );
        readProductsQueries.status === "error"
            ? customRequest(
                  res,
                  httpStatus.Error,
                  "error",
                  "List of products",
                  readProductsQueries
              )
            : customRequest(
                  res,
                  httpStatus.Ok,
                  "success",
                  "List of products",
                  readProductsQueries
              );
    }
    async getProductsFiltered(req: Request, res: Response) {
        let { filter } = req.params;
        let getProductsFilter = await ProductsService.getProductByFilter(
            filter
        );
        req.params === undefined
            ? customRequest(
                  res,
                  httpStatus.NotFound,
                  "error",
                  `We didn't find a product for your Filter`,
                  getProductsFilter
              )
            : customRequest(
                  res,
                  httpStatus.Ok,
                  "success",
                  `This is the product filtered!`,
                  getProductsFilter
              );
    }
    async getById(req: Request, res: Response) {
        const { pid } = req.params;
        let getProductsID = await ProductsService.getProductById(pid);
        getProductsID.length === 0
            ? customRequest(
                  res,
                  httpStatus.NotFound,
                  "error",
                  `We didn't find a product for your id`,
                  getProductsID
              )
            : customRequest(
                  res,
                  httpStatus.Ok,
                  "success",
                  `This is the product with id: ${getProductsID[0].pID}`,
                  getProductsID
              );
    }

    async getMockedProducts(req: Request, res: Response) {
        let getMockedProducts = await ProductsService.getMockedProducts();
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "Your Mocked Products",
            getMockedProducts
        );
    }
    async create(req: Request, res: Response) {
        const addData = await ProductsService.addProduct(req.body);
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            `You added a new product!`,
            addData
        );
    }
    async update(req: Request, res: Response) {
        const { pid } = req.params;
        const updateData = await ProductsService.updateProduct(pid, req.body);
        updateData.modifiedCount > 0
            ? customRequest(
                  res,
                  httpStatus.Ok,
                  "success",
                  "data updated successfully",
                  {}
              )
            : customRequest(
                  res,
                  httpStatus.Error,
                  "error",
                  "Product not updated successfully",
                  {}
              );
    }
    async deleteOne(req: Request, res: Response) {
        const { pid } = req.params;
        const deleteData = await ProductsService.deleteProductById(pid);
        deleteData.deletedCount > 0
            ? customRequest(
                  res,
                  httpStatus.Ok,
                  "success",
                  "product deleted successfully",
                  {}
              )
            : customRequest(
                  res,
                  httpStatus.Error,
                  "error",
                  "No product found to delete",
                  {}
              );
    }
    async deleteAll(req: Request, res: Response) {
        const deleteData = await ProductsService.deleteAllProducts();
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "products deleted successfully",
            {}
        );
    }
}

export const ProductsController = new ProductController();
