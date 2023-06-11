import { ICartFunction } from "../../interfaces";
import { CartModel, ProductModel } from "../models";
import { ICart } from "../../interfaces";
import { TCart } from "../../types";
import { ProductService } from "./products.services";
import { pid } from "process";

const ServiceProducts = new ProductService();

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
    async addProductInCart(cID: number, pID: number) {
        let result = true;
        const getCart = await this.getCartById(cID);
        const getProduct = await ServiceProducts.getProductById(pID);
        if (!getProduct || !getCart) {
            return undefined;
        }
        let newProd: { _id: any; pID?: number; quantity: number } = {
            _id: getProduct[0]._id,
            pID: getProduct[0].pID,
            quantity: 1,
        };
        if (getCart[0]?.products.find((product: any) => product?.pID === pID)) {
            const indexProduct = getCart[0]?.products.findIndex(
                (item: any) => item?.pID === pID
            );
            if (indexProduct !== -1) {
                let value = Number(
                    getCart[0]?.products[indexProduct]?.quantity
                );
                value++;
                let updateProd = {
                    _id: getProduct[0]._id,
                    pID: getProduct[0].pID,
                    quantity: value,
                };
                getCart[0].products[indexProduct] = updateProd;
                const productUpdate = await CartModel.updateOne({ cID: cID }, [
                    { $set: getCart[0] },
                ]);
            }
        } else {
            getCart[0]?.products.push(newProd);
            const productCreate = await CartModel.create(getCart);
        }

        return getCart;
    }

    async updateProductsFromCart(cID: number, body: any) {
        const getCart = await this.getCartById(cID);
        const getProduct = await ServiceProducts.getProductById(body.pID);
        let newBody: any = {
            pID: body.pID,
            quantity: body.quantity,
            _id: getProduct[0]._id,
        };
        getCart[0].products = newBody;
        const productUpdate = await CartModel.updateOne({ cID: cID }, [
            { $set: getCart[0] },
        ]);
        return getCart;
    }

    async UpdateQuantityProduct(cID: number, pID: number, body: any) {
        const getCart = await this.getCartById(cID);
        const getProduct = await ServiceProducts.getProductById(pID);
        let newBody: any = {
            pID: getProduct[0].pID,
            quantity: body.quantity,
            _id: getProduct[0]._id,
        };
        getCart[0].products = newBody;
        const productUpdate = await CartModel.updateOne({ cID: cID }, [
            { $set: getCart[0] },
        ]);
        return getCart;
    }

    async deleteProductFromCart(cID: number, pID: number) {
        const getCart = await this.getCartById(cID);
        const getProduct = await ServiceProducts.getProductById(pID);
        if (!getProduct || !getCart) {
            return undefined;
        }
        let newData: any = getCart[0].products.filter(
            (product: any) => product.pID !== pID
        );
        getCart[0].products = newData;
        const productUpdate = await CartModel.updateOne({ cID: cID }, [
            { $set: getCart[0] },
        ]);
    }
    async deleteAllProductsFromCart(cID: number) {
        const getCart = await this.getCartById(cID);
        getCart[0].products = [];
        const productUpdate = await CartModel.updateOne({ cID: cID }, [
            { $set: getCart[0] },
        ]);
        return getCart;
    }
    async deleteAllCarts() {
        let del = await CartModel.deleteMany();
        return del;
    }
}
