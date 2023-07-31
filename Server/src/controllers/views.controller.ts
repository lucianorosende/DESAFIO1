import { Request, Response } from "express";
import { SessionData } from "express-session";
import { ProductsService, ViewsService, CartsService, UsersService } from "../services";
import { UserDTO } from "../DAO/DTO/UserDTO";

class ViewController {
    async renderProducts(req: Request, res: Response) {
        let getProds = await ProductsService.getProductsQueries(req.query);
        let paginateData = await ViewsService.productData(getProds);
        res.render("products", {
            prod: getProds.payload,
            pagination: paginateData,
            user: (req.session as SessionData).user.email,
        });
    }
    async renderCart(req: Request, res: Response) {
        let getCart = await CartsService.getCartByIdAndPopulate(req.params);
        let cartData = await ViewsService.cartData(getCart);
        res.render("cart", {
            cart: cartData,
        });
    }
    async renderCurrent(req: Request, res: Response) {
        let currentDTO = UserDTO(req.session)
        res.render("profile", {
            user: currentDTO
        })
    }
}

export const ViewsController = new ViewController();
