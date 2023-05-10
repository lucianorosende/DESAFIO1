import { Cart } from "../types";
import { ICart } from "../interfaces";
import fs from "fs";
import { ICartFunctions } from "../interfaces";
import { newProduct } from ".";

class CartManager implements ICartFunctions {
    #path: string;

    constructor(path: string) {
        this.#path = path;
    }

    async getCarts() {
        let res: Cart[] = [];
        res = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
        return res;
    }

    async getCartById(id: number) {
        let res: Cart[] = [];
        res = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
        const findId: Cart = res.find((obj) => obj?.id === id);
        return findId;
    }

    async addCart() {
        let res: Cart[] = [];
        res = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
        let cart: ICart = { products: [] };
        if (res.length === 0) {
            cart.id = 1;
        } else {
            let newId: number = res[res.length - 1]?.id ?? 0;
            cart.id = newId + 1;
        }
        res.push(cart);
        await fs.promises.writeFile(this.#path, JSON.stringify(res, null, 2));
        return res;
    }

    async addProductInCart(cID: number, pID: number) {
        let res: Cart[] = [];
        res = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
        let result = true;
        const getCart = await this.getCartById(cID);
        const getProduct = await newProduct.getProductById(pID);
        let index: number = res.findIndex((obj) => obj?.id === cID);
        let newProd: { id?: number; quantity: number } = {
            id: getProduct?.id,
            quantity: 1,
        };
        if (!getProduct || !getCart) {
            return false;
        }

        if (getCart?.products.find((product) => product?.id === pID)) {
            const indexProduct = getCart?.products.findIndex(
                (item) => item?.id === pID
            );
            if (indexProduct !== -1) {
                let value = Number(getCart?.products[indexProduct]?.quantity);
                value++;
                let updateProd = {
                    id: getProduct?.id,
                    quantity: value,
                };
                getCart!.products[indexProduct] = updateProd;
                res[index] = getCart;
                await fs.promises.writeFile(
                    this.#path,
                    JSON.stringify(res, null, 2)
                );
            }
        } else {
            getCart?.products.push(newProd);
            res[index] = getCart;
            await fs.promises.writeFile(
                this.#path,
                JSON.stringify(res, null, 2)
            );
        }

        return getCart;
    }
}

export const newCart = new CartManager("src/JSON/cart.json");
