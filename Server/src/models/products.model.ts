import { IProduct } from "../interfaces";
import { ProductMongooseModel } from "../schemas";

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
