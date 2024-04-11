import { Request, Response } from "express";
import { SessionData } from "express-session";
import {
    ProductsService,
    ViewsService,
    CartsService,
    UsersService,
} from "../services";
import { UserDTO } from "../DAO/DTO/UserDTO";

class ViewController {
    async renderCart(req: Request, res: Response) {
        let getCart = await CartsService.getCartByIdAndPopulate(req.params);
        let cartData = await ViewsService.cartData(getCart);
        res.render("cart", {
            cart: cartData,
            cID: Number(req.params.cid),
            email: req.session.user.email,
        });
    }
    async renderCurrent(req: Request, res: Response) {
        let currentDTO = UserDTO(req.session);
        res.render("profile", {
            user: currentDTO,
        });
    }
    async renderMessages(req: Request, res: Response) {
        res.render("messages", {
            admin: req.session.user.isAdmin,
            email: req.session.user.email,
        });
    }
    async renderRecoverPass(req: Request, res: Response) {
        res.render("recoverPass");
    }
    async renderEmail(req: Request, res: Response) {
        res.render("checkEmail");
    }
    async renderCreateProduct(req: Request, res: Response) {
        res.render("createProduct", {
            email: req.session.user.email,
        });
    }
    async renderUpdateProduct(req: Request, res: Response) {
        let getProd = await ProductsService.getProductById(req.params);
        res.render("updateProduct", {
            title: getProd[0].title,
            description: getProd[0].description,
            price: getProd[0].price,
            image: getProd[0].image,
            stock: getProd[0].stock,
            category: getProd[0].category,
            pID: getProd[0].pID,
        });
    }
    async renderChangeRole(req: Request, res: Response) {
        let user = await UsersService.findUserById(req.session.user._id);
        res.render("changeRole", {
            role: user?.role,
            uid: req.session.user._id,
        });
    }
    async renderAccounts(req: Request, res: Response) {
        let getUsers = await UsersService.getUsers();
        res.render("accounts", {
            users: getUsers,
        });
    }
}

export const ViewsController = new ViewController();
