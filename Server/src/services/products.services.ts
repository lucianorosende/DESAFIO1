import { CartsService, UsersService, ViewsService } from ".";
import { IProductFunction, IProduct, IProductPages } from "../interfaces";
import { ProductsModel } from "../DAO/MONGO";
import { faker } from "@faker-js/faker";
import { sendMail } from "../utils/sendMail";

class ProductService implements IProductFunction {
    async getProducts() {
        let res = await ProductsModel.getAll();
        return res;
    }
    async getProductsCategories() {
        let res = await ProductsModel.getAll();
        const dataFilter = res.map((item) => item.category);
        const unique = [...new Set(dataFilter)];
        return unique;
    }
    async getCategoriesAll(reqParams: any) {
        let res = await ProductsModel.getAll();
        let data = res.filter((item) => item.category === reqParams.category);
        return data;
    }
    async getProductsQueries(reqQuery: any) {
        let defaultLimit: number = 3;
        let defaultPages: number = 1;
        let options: unknown;
        const { category, stock, limit, pages, sort } = reqQuery;

        category === undefined && stock === undefined ? (options = {}) : null;
        category ? (options = { category: category }) : null;
        stock ? (options = { stock: stock }) : null;
        category && stock
            ? (options = { $or: [{ category: category }, { stock: stock }] })
            : null;

        // @ts-ignore
        let getPagination = await ProductsModel.getPaginate(
            pages,
            defaultPages,
            limit,
            defaultLimit,
            sort,
            options
        );
        let { docs } = getPagination;

        let newData: IProduct[] = docs.map((doc: IProduct) => {
            return {
                title: doc.title,
                description: doc.description,
                price: doc.price,
                image: doc.image,
                stock: doc.stock,
                category: doc.category,
                pID: doc.pID,
                owner: doc.owner,
            };
        });

        let objPaginated: IProductPages = {
            status: "success",
            payload: newData,
            totalPages: getPagination.totalPages,
            prevPage: getPagination.prevPage,
            nextPage: getPagination.nextPage,
            page: getPagination.page,
            hasPrevPage: getPagination.hasPrevPage,
            hasNextPage: getPagination.hasNextPage,
            prevLink: getPagination.prevPage,
            nextLink: getPagination.nextPage,
        };
        if (getPagination.hasPrevPage === false) {
            objPaginated.prevLink = null;
        }
        if (getPagination.hasNextPage === false) {
            objPaginated.nextLink = null;
        }
        if (objPaginated.payload.length === 0) {
            objPaginated.status = "error";
        }

        return objPaginated;
    }
    async getProductById(reqParams: any) {
        const { pid } = reqParams;
        let res = await ProductsModel.getById(pid);
        return res;
    }
    async getMockedProducts() {
        let generatedProds: any = [];
        for (let i = 0; i <= 100; i++) {
            let obj: any = {
                title: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price({ min: 100, max: 999, dec: 0 }),
                thumbnail: faker.commerce.productMaterial(),
                code: faker.string.uuid(),
                stock: faker.string.numeric(2),
                status: faker.datatype.boolean({ probability: 0.1 }),
                category: faker.commerce.productAdjective(),
                pID: i,
            };
            generatedProds.push(obj);
        }
        return generatedProds;
    }
    async addProduct(prod: IProduct) {
        let readData = await this.getProducts();
        if (readData.length === 0) {
            prod.pID = 1;
        } else {
            let newId: number = readData[readData.length - 1]?.pID ?? 0;
            prod.pID = newId + 1;
        }
        if (!prod.owner) {
            prod.owner = "admin";
        }
        let res = await ProductsModel.create(prod);
        return res;
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
    async updateProduct(reqParams: any, prod: IProduct) {
        const { pid } = reqParams;
        const userUpdate = await ProductsModel.update(pid, prod);
        return userUpdate;
    }
    async deleteProductById(reqParams: any) {
        const { pid } = reqParams;
        const getProdInfo = await this.getProductById(reqParams);
        const isUserPremium = await UsersService.findUserByEmail(
            getProdInfo[0].owner as string
        );
        if (isUserPremium?.role === "premium") {
            sendMail(
                "unknownemail@gmail.com",
                getProdInfo[0].owner as string,
                "Deleted product",
                "Your product has been deleted"
            );
        }

        let del = await ProductsModel.deleteOne(pid);
        return del;
    }
    async deleteAllProducts() {
        let del = await ProductsModel.deleteAll();
        return del;
    }
}

export const ProductsService = new ProductService();
