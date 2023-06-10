import { IProductFunction, IProduct, IProductPages } from "../../interfaces";
import { ProductModel } from "../models";

export class ProductService implements IProductFunction {
    async getProducts() {
        let res = await ProductModel.find({});
        return res;
    }
    async getProductsQueries(
        category: string,
        stock: number,
        limit: string,
        pages: string,
        sort: string
    ) {
        let defaultLimit: number = 10;
        let defaultPages: number = 1;
        let options: unknown;

        category === undefined && stock === undefined ? (options = {}) : null;
        // BUG FIX -- How to make stock not work when it's not a number?
        // isNaN(stock) ? (options = {stock: stock}) : null;
        category ? (options = { category: category }) : null;
        stock ? (options = { stock: stock }) : null;
        category && stock
            ? (options = { $or: [{ category: category }, { stock: stock }] })
            : null;

        // Make interface for resPaginate
        // @ts-ignore
        let resPaginate = await ProductModel.paginate(options, {
            page: pages ?? defaultPages,
            limit: limit ?? defaultLimit,
            sort: {
                price: sort,
                pID: sort,
            },
        });
        console.log(resPaginate);
        let { docs } = resPaginate;
        let newData: IProduct[] = docs.map((doc: IProduct) => {
            return {
                title: doc.title,
                description: doc.description,
                price: doc.price,
                thumbnails: doc.thumbnails,
                code: doc.code,
                stock: doc.stock,
                status: doc.status,
                category: doc.category,
                pID: doc.pID,
            };
        });
        let objPaginated: IProductPages = {
            status: "success",
            payload: newData,
            totalPages: resPaginate.totalPages,
            prevPage: resPaginate.prevPage,
            nextPage: resPaginate.nextPage,
            page: resPaginate.page,
            hasPrevPage: resPaginate.hasPrevPage,
            hasNextPage: resPaginate.hasNextPage,
            prevLink: resPaginate.prevPage,
            nextLink: resPaginate.nextPage,
        };
        if (resPaginate.hasPrevPage === false) {
            objPaginated.prevLink = null;
        }
        if (resPaginate.hasNextPage === false) {
            objPaginated.nextLink = null;
        }
        if (objPaginated.payload.length === 0) {
            objPaginated.status = "error";
        }

        return objPaginated;
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
        const userUpdate = await ProductModel.updateOne(
            { pID: id },
            { $set: prod }
        );
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
