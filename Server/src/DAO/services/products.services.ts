import { AnyArray } from "mongoose";
import { IProductFunction, IProduct } from "../../interfaces";
import { TProduct } from "../../types";
import { ProductModel } from "../models";

export class ProductService implements IProductFunction {
    async getProducts() {
        let res = await ProductModel.find({});
        return res;
    }
    async getProductsQueries(
        category: any,
        stock: any,
        limit: any,
        pages: any,
        sort: any
    ) {
        let defaultLimit = 10;
        let defaultPages = 1;
        let options;
        if (category === undefined && stock === undefined) {
            options = {};
        }
        if (category) {
            options = {
                category: category,
            };
        }
        if (stock) {
            options = {
                stock: stock,
            };
        }
        if (category && stock) {
            options = { $or: [{ category: category }, { stock: stock }] };
        }

        // @ts-ignore
        let resPaginate = await ProductModel.paginate(options, {
            page: pages ?? defaultPages,
            limit: limit ?? defaultLimit,
            sort: {
                price: sort,
            },
        });
        let { docs } = resPaginate;
        let newData = docs.map((doc: any) => {
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
        let objPaginated = {
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

        return objPaginated;

        // if (limit && pages) {
        //     console.log("test");
        // } else {
        //     console.log("doesnt work");
        // }
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
