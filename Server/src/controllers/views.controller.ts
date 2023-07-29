import { Request, Response } from "express";
import { SessionData } from "express-session";
import { ProductsService, ViewsService, CartsService } from "../services";

class ViewController {
    async renderProducts(req: Request, res: Response) {
        let getProds = await ProductsService.getProductsQueries(req.query);
        let paginateData = await ViewsService.productData(getProds);
        console.log(req.session);
        res.render("products", {
            prod: getProds.payload,
            pagination: paginateData,
            user: (req.session as SessionData).user.email,
        });
    }
    async renderCart(req: Request, res: Response) {
        let getCart = await CartsService.getCartByIdAndPopulate(req.params);
        let cartData = await ViewsService.cartData(getCart);
        console.log(cartData);
        res.render("cart", {
            cart: cartData,
        });
    }
}

export const ViewsController = new ViewController();
