import { TCart } from "../../types";
import { ICart } from "../../interfaces";
import fs from "fs";
import { newProduct } from ".";

class CartManager {
    #path: string;

    constructor(path: string) {
        this.#path = path;
    }

    async getCarts() {
        let res: TCart[] = [];
        res = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
        return res;
    }

    async getCartById(id: number) {
        let res: TCart[] = [];
        res = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
        const findId: TCart = res.find((obj) => obj?.cID === id);
        return findId;
    }

    async addCart() {
        let res: TCart[] = [];
        res = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
        let cart: ICart = { products: [] };
        if (res.length === 0) {
            cart.cID = 1;
        } else {
            let newId: number = res[res.length - 1]?.cID ?? 0;
            cart.cID = newId + 1;
        }
        res.push(cart);
        await fs.promises.writeFile(this.#path, JSON.stringify(res, null, 2));
        return res;
    }

    async addProductInCart(cID: number, pID: number) {
        let res: TCart[] = [];
        res = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
        let result = true;
        const getCart = await this.getCartById(cID);
        const getProduct = await newProduct.getProductById(pID);
        let index: number = res.findIndex((obj) => obj?.cID === cID);
        let newProd: { id?: number; quantity: number } = {
            id: getProduct?.pID,
            quantity: 1,
        };
        if (!getProduct || !getCart) {
            return undefined;
        }

        if (getCart?.products.find((product) => product?.id === pID)) {
            const indexProduct = getCart?.products.findIndex(
                (item) => item?.id === pID
            );
            if (indexProduct !== -1) {
                let value = Number(getCart?.products[indexProduct]?.quantity);
                value++;
                let updateProd = {
                    id: getProduct?.pID,
                    quantity: value,
                };
                getCart.products[indexProduct] = updateProd;
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
