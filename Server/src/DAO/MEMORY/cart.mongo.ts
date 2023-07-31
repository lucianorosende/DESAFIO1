import { ICart } from "../../interfaces";
import { CartMongooseModel } from "../MONGO/models";
import { TCart } from "../../types";

// ALL MEMORY PERSISTENCY IS JUST FOR DEMONSTRATION
class CartModel {
    private data: any[]
    constructor() {
        this.data = [];
      }
    async getAll() {
        return this.data
    }
    async getById(cid: number) {
        let res = this.data.find(cart => cart.cID === cid);
        return res;
    }
    async getAndPopulate(cid: number) {
       // ?????????????
    }
    async create(cart: ICart | TCart[]) {
        this.data.push(cart);
        return this.data
    }
    async updateProductIntoCart(cid: number, getCart: TCart[]) {
        // ????????????
    }
    async deleteAll() {
        this.data = []
        return this.data
    }
}

export const CartsModel = new CartModel();
