import { ICart } from "../../interfaces";
import { CartMongooseModel } from "./models";
import { TCart } from "../../types";

class CartModel {
    async getAll() {
        let res = await CartMongooseModel.find({});
        return res;
    }
    async getById(cid: string) {
        let res = await CartMongooseModel.find({ cID: cid });
        return res;
    }
    async getAndPopulate(cid: string) {
        let res = await CartMongooseModel.find({ cID: cid }).populate(
            "products._id"
        );
        return res;
    }
    async create(cart: ICart | TCart[]) {
        let add = await CartMongooseModel.create(cart);
        return add;
    }
    async updateProductIntoCart(cid: string, getCart: TCart[]) {
        const productUpdate = await CartMongooseModel.updateOne({ cID: cid }, [
            { $set: getCart[0] },
        ]);
        return productUpdate;
    }
    async deleteAll() {
        let del = await CartMongooseModel.deleteMany();
        return del;
    }
}

export const CartsModel = new CartModel();
