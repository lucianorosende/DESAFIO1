import { ICartFunction, ICartProduct, ICart, IProduct } from "../interfaces";
import { TCart } from "../types";
import { CartsModel, ProductsModel } from "../DAO/MONGO";
import { ViewsService } from "./views.services";

class CartService implements ICartFunction {
    async getAll() {
        let res = await CartsModel.getAll();
        return res;
    }
    async getCartById(reqParams: any) {
        const { cid } = reqParams;
        let res = await CartsModel.getById(cid);
        return res;
    }
    async getCartByIdNotParams(cid: number) {
        let res = await CartsModel.getById(cid);
        return res;
    }
    async getCartByIdAndPopulate(reqParams: any) {
        const { cid } = reqParams;
        let res: any = await CartsModel.getAndPopulate(cid);
        return res;
    }
    async addCart() {
        let res: TCart[] = await CartsModel.getAll();
        let cart: ICart = { products: [] };
        if (res.length === 0) {
            cart.cID = 1;
        } else {
            let newId: number = res[res.length - 1]?.cID ?? 0;
            cart.cID = newId + 1;
        }
        let add = await CartsModel.create(cart);
        return add.cID;
    }
    async addProductInCart(reqParams: any) {
        const { cid, pid } = reqParams;
        const getCart: TCart[] = await CartsModel.getById(cid);
        const getProduct = await ProductsModel.getById(pid);
        if (!getProduct || !getCart) {
            return undefined;
        }
        let newProd: ICartProduct = {
            _id: getProduct[0]._id,
            pID: getProduct[0].pID,
            quantity: 1,
        };

        if (
            getCart[0]?.products.find(
                (product: ICartProduct) => product?.pID === Number(pid)
            )
        ) {
            const indexProduct = getCart[0]?.products.findIndex(
                (item: ICartProduct) => item?.pID === Number(pid)
            );
            if (indexProduct !== -1) {
                let value = Number(
                    getCart[0]?.products[indexProduct]?.quantity
                );
                value++;
                let updateProd: ICartProduct = {
                    _id: getProduct[0]._id,
                    pID: getProduct[0].pID,
                    quantity: value,
                };
                getCart[0].products[indexProduct] = updateProd;
                const productUpdate = await CartsModel.updateProductIntoCart(
                    cid,
                    getCart
                );
            }
        } else {
            getCart[0]?.products.push(newProd);
            const productCreate = await CartsModel.updateProductIntoCart(
                cid,
                getCart
            );
        }
        return getCart;
    }

    async updateProductsFromCart(reqParams: any, body: ICartProduct) {
        const { cid } = reqParams;
        const getCart = await CartsModel.getById(cid);
        const getProduct = await ProductsModel.getById(body.pID!);
        let newBody: ICartProduct = {
            pID: body.pID,
            quantity: body.quantity,
            _id: getProduct[0]._id,
        };
        getCart[0].products = [newBody];
        const productUpdate = await CartsModel.updateProductIntoCart(
            cid,
            getCart
        );
        return getCart;
    }

    async UpdateQuantityProduct(reqParams: any, body: ICartProduct) {
        const { cid, pid } = reqParams;
        const getCart = await CartsModel.getById(cid);
        const getProduct = await ProductsModel.getById(pid);
        let newBody: ICartProduct = {
            pID: getProduct[0].pID,
            quantity: body.quantity,
            _id: getProduct[0]._id,
        };
        getCart[0].products = [newBody];
        const productUpdate = await CartsModel.updateProductIntoCart(
            cid,
            getCart
        );
        return getCart;
    }

    async updateStockFromProducts(reqParams: any) {
        const { cid } = reqParams;
        let getCart = await CartsService.getCartByIdAndPopulate(reqParams);
        let cartData = await ViewsService.cartData(getCart);
        const newArray = cartData.map((item) => ({
            title: item.title,
            description: item.description,
            price: item.price,
            image: item.image,
            stock: item.stock! - item.quantity,
            category: item.category,
            pID: item.pID,
            _id: item._id,
            __v: item.__v,
        }));
        const update = await ProductsModel.updateAllProducts(newArray);
        return update;
    }

    async replaceCart(reqParams: any) {
        const { cid, email } = reqParams;
        let cart: any = await CartsService.getCartByIdAndPopulate(reqParams);
        let cart2: any = await CartsService.getCartById(reqParams);
        let newArr = cart[0].products.filter(
            (product: any) => product._id.stock === 0
        );
        let format = newArr.map((product: any) => {
            return {
                quantity: product.quantity,
                pID: product.pID,
                _id: product._id._id,
            };
        });
        let newCart = [
            {
                _id: cart2[0]._id,
                products: format,
                cID: cart2[0].cID,
                __v: cart2[0].__v,
            },
        ];
        let update = await CartsModel.updateProductIntoCart(cid, newCart);
    }

    async deleteProductFromCart(reqParams: any) {
        const { cid, pid } = reqParams;
        const getCart = await CartsModel.getById(cid);
        const getProduct = await ProductsModel.getById(pid);
        if (!getProduct || !getCart) {
            return undefined;
        }
        let newData: ICartProduct[] = getCart[0].products.filter(
            (product: ICartProduct) => product.pID !== Number(pid)
        );
        getCart[0].products = newData;
        const productUpdate = await CartsModel.updateProductIntoCart(
            cid,
            getCart
        );
        return getCart;
    }
    async deleteAllProductsFromCart(reqParams: any) {
        const { cid } = reqParams;
        const getCart = await CartsModel.getById(cid);
        getCart[0].products = [];
        const productUpdate = await CartsModel.updateProductIntoCart(
            cid,
            getCart
        );
        return getCart;
    }
    async deleteAllCarts() {
        let del = await CartsModel.deleteAll();
        return del;
    }
}

export const CartsService = new CartService();
