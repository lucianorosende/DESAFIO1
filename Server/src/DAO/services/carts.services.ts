import { ICartFunction } from "../../interfaces";
import { CartModel } from "../models";
import { ICart } from "../../interfaces";
import { TCart } from "../../types";

export class CartService implements ICartFunction {
    async getCarts() {
        let res = await CartModel.find({});
        return res;
    }
    async getCartById(cid: number) {
        let res = await CartModel.find({ cID: cid });
        return res;
    }
    async addCart() {
        let res: TCart[] = await CartModel.find({});
        let cart: ICart = { products: [] };
        if (res.length === 0) {
            cart.cID = 1;
        } else {
            let newId: number = res[res.length - 1]?.cID ?? 0;
            cart.cID = newId + 1;
        }
        let add = await CartModel.create(cart);
        return add;
    }
    // async updateCart(cid: number, prod: IProduct) {
    //     const userUpdate = await ProductModel.updateOne(
    //         { pID: id },
    //         { $set: prod }
    //     );
    //     return userUpdate;
    // }
    // async deleteProductById(id: number) {
    //     let del = await ProductModel.deleteOne({ pID: id });
    //     return del;
    // }
    async deleteAllCarts() {
        let del = await CartModel.deleteMany();
        return del;
    }
}
