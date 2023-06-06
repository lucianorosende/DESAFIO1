import { IProductFunction } from "../../interfaces";
import { TProduct } from "../../types";
import { ProductModel } from "../models";

export class ProductService {
    async getProducts() {
        let res = await ProductModel.find({});
        return res;
    }
    async getProductById(pid: any) {
        let res = await ProductModel.find({ pID: pid });
        return res;
    }
    async addProduct(prod: any) {
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
    async updateProduct(id: any, prod: any) {
        const userUpdate = await ProductModel.updateOne({ pID: id }, prod);
        return userUpdate;
    }
    async deleteProductById(id: any) {
        await ProductModel.deleteOne({ pID: id });
    }
    async deleteAllProducts() {
        await ProductModel.deleteMany();
    }
}
