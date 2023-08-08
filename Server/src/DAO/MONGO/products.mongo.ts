import { IProduct } from "../../interfaces";
import { ProductMongooseModel } from "./models";

class ProductModel {
    async getAll() {
        let res = await ProductMongooseModel.find({});
        return res;
    }
    async getPaginate(
        pages: number,
        defaultPages: number,
        limit: number,
        defaultLimit: number,
        sort: number,
        options: any
    ) {
        // @ts-ignore
        let resPagination = await ProductMongooseModel.paginate(options, {
            page: pages ?? defaultPages,
            limit: limit ?? defaultLimit,
            sort: {
                price: sort,
                pID: sort,
            },
        });
        return resPagination;
    }
    async getById(pid: number) {
        let res = await ProductMongooseModel.find({ pID: pid });
        return res;
    }
    async create(prod: IProduct) {
        let res = await ProductMongooseModel.create(prod);
        return res;
    }
    async update(pid: number, prod: IProduct) {
        const userUpdate = await ProductMongooseModel.updateOne(
            { pID: pid },
            { $set: prod }
        );
        return userUpdate;
    }
    async updateAllProducts(prod: any) {
        let ids = [];
        for (let i = 0; i < prod.length; i++) {
            if (prod[i].stock < 1) {
                ids.push({ rejectedProd: prod[i]._id, stock: prod[i].stock });
            } else {
                const userUpdate = await ProductMongooseModel.updateOne(
                    { pID: prod[i].pID },
                    { $set: prod[i] }
                );
                console.log("stock updated");
            }
        }
        return ids;
    }
    async deleteOne(pid: number) {
        let del = await ProductMongooseModel.deleteOne({ pID: pid });
        return del;
    }
    async deleteAll() {
        let del = await ProductMongooseModel.deleteMany();
        return del;
    }
}

export const ProductsModel = new ProductModel();
