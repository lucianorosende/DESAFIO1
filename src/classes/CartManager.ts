import { Cart } from "../types";
import { ICart } from "../interfaces";
import fs from "fs";
import { ICartFunctions } from "../interfaces";

class CartManager implements ICartFunctions {
    #path: string;
    #cart: Cart[];
    constructor(path: string, cart: Cart[]) {
        this.#path = path;
        this.#cart = cart;
    }

    async getCartById(id: number) {
        let res: Cart[] = [];
        res = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
        const findId: Cart = res.find((obj) => obj?.id === id);
        return findId;
    }

    async addCart() {
        let cart: ICart = { products: [] };
        if (this.#cart.length === 0) {
            cart.id = 1;
        } else {
            let newId: number = this.#cart[this.#cart.length - 1]?.id ?? 0;
            cart.id = newId + 1;
        }
        this.#cart.push(cart);
        await fs.promises.writeFile(
            this.#path,
            JSON.stringify(this.#cart, null, 2)
        );
        return this.#cart;
    }
}

export const newCart = new CartManager("src/JSON/cart.json", []);
