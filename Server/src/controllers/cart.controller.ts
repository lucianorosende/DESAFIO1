import { CartsService, ProductsService } from "../services";
import { customRequest } from "../utils";
import { httpStatus } from "../utils";
import { Request, Response } from "express";

class CartController {
    async getAll(req: Request, res: Response) {
        const getCarts = await CartsService.getAll();
        getCarts.length === 0
            ? customRequest(
                  res,
                  httpStatus.Error,
                  "error",
                  "No Carts available",
                  getCarts
              )
            : customRequest(
                  res,
                  httpStatus.Error,
                  "success",
                  "List of Carts",
                  getCarts
              );
    }
    async getById(req: Request, res: Response) {
        let getProductsID = await CartsService.getCartById(req.params);
        getProductsID.length === 0
            ? customRequest(
                  res,
                  httpStatus.NotFound,
                  "error",
                  `We didn't find a Cart for your id`,
                  getProductsID
              )
            : customRequest(
                  res,
                  httpStatus.Ok,
                  "success",
                  `This is the Cart with id: ${getProductsID[0].cID}`,
                  getProductsID
              );
    }
    async getAndPopulate(req: Request, res: Response) {
        let getProductsID = await CartsService.getCartByIdAndPopulate(
            req.params
        );
        getProductsID.length === 0
            ? customRequest(
                  res,
                  httpStatus.NotFound,
                  "error",
                  `We didn't find a Cart for your id`,
                  getProductsID
              )
            : customRequest(
                  res,
                  httpStatus.Ok,
                  "success",
                  `This is the Cart with id: ${getProductsID[0].cID}`,
                  getProductsID
              );
    }
    async create(req: Request, res: Response) {
        const addCart = await CartsService.addCart();
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "Cart added successfully",
            addCart
        );
    }
    async addProductIntoCart(req: Request, res: Response) {
        const addProductInCart = await CartsService.addProductInCart(
            req.params
        );
        addProductInCart !== undefined
            ? customRequest(
                  res,
                  httpStatus.Ok,
                  "success",
                  "Product added successfully into cart",
                  addProductInCart
              )
            : customRequest(
                  res,
                  httpStatus.NotFound,
                  "error",
                  "Product was not added successfully",
                  {}
              );
    }
    async updateProductFromCart(req: Request, res: Response) {
        const updateCart = await CartsService.updateProductsFromCart(
            req.params,
            req.body
        );
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "products updated successfully",
            {}
        );
    }
    async updateQuantity(req: Request, res: Response) {
        const { cid, pid } = req.params;
        const updateCart = await CartsService.UpdateQuantityProduct(
            req.params,
            req.body
        );
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "products updated successfully",
            updateCart
        );
    }
    async deleteProductFromCart(req: Request, res: Response) {
        const deleteProducts = await CartsService.deleteProductFromCart(
            req.params
        );
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "products updated successfully",
            deleteProducts
        );
    }
    async deleteAllProductsFromCart(req: Request, res: Response) {
        const deleteData = await CartsService.deleteAllProductsFromCart(
            req.params
        );
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "Products deleted successfully",
            deleteData
        );
    }
    async deleteAll(req: Request, res: Response) {
        const deleteData = await CartsService.deleteAllCarts();
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "Carts deleted successfully",
            []
        );
    }
}

export const CartsController = new CartController();
