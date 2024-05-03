import { IProduct } from "../../interfaces";
import { ProductMongooseModel } from "./models";
import { logger } from "../../utils";

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
        // const productSearch = {
        //     ...(title ? { $text: { $search: title } } : {}),
        // };
        // console.log(productSearch);
        // options = productSearch;
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
    async getById(pid: number | undefined | string) {
        let res = await ProductMongooseModel.find({ pID: pid });
        return res;
    }
    async create(prod: IProduct) {
        let res = await ProductMongooseModel.create(prod);
        return res;
    }
    async update(pid: string, prod: IProduct) {
        const userUpdate = await ProductMongooseModel.updateOne(
            { pID: pid },
            { $set: prod }
        );
        return userUpdate;
    }
    async updateAllProducts(prod: any) {
        let ids = [];
        for (let i = 0; i < prod.length; i++) {
            if (prod[i].stock < 0) {
                ids.push({ rejectedProd: prod[i]._id, stock: prod[i].stock });
            } else {
                const userUpdate = await ProductMongooseModel.updateOne(
                    { pID: prod[i].pID },
                    { $set: prod[i] }
                );
                logger.info("stock updated");
            }
        }
        return ids;
    }
    async deleteOne(pid: string) {
        let del = await ProductMongooseModel.deleteOne({ pID: pid });
        return del;
    }
    async deleteAll() {
        let del = await ProductMongooseModel.deleteMany();
        return del;
    }
}

export const ProductsModel = new ProductModel();
