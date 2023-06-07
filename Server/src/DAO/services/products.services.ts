import { IProductFunction, IProduct } from "../../interfaces";
import { TProduct } from "../../types";
import { ProductModel } from "../models";

export class ProductService implements IProductFunction {
    async getProducts() {
        let res = await ProductModel.find({});
        return res;
    }
    async getProductById(id: number) {
        let res = await ProductModel.find({ pID: id });
        return res;
    }
    async addProduct(prod: IProduct) {
        let readData = await this.getProducts();
        if (readData.length === 0) {
            prod.pID = 1;
        } else {
            let newId: number = readData[readData.length - 1]?.pID ?? 0;
            prod.pID = newId + 1;
        }

        let res = await ProductModel.create(prod);
        return res;
    }
    async updateProduct(id: number, prod: IProduct) {
        const userUpdate = await ProductModel.updateOne({ pID: id }, prod);
        return userUpdate;
    }
    async deleteProductById(id: number) {
        let del = await ProductModel.deleteOne({ pID: id });
        return del;
    }
    async deleteAllProducts() {
        let del = await ProductModel.deleteMany();
        return del;
    }
}
