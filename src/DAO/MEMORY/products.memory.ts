import { IProduct } from "../../interfaces";

// ALL MEMORY PERSISTENCY IS JUST FOR DEMONSTRATION - THIS DOESNT WORK
class ProductModel {
    private data: any[]
    constructor() {
        this.data = [];
      }
    async getAll() {
        return this.data
    }
    async getPaginate() {
        // ????????
    }
    async getById(pid: number) {
        let res = this.data.find(prod=> prod.pID === pid);
        return res;
    }
    async create(prod: IProduct) {
        this.data.push(prod);
        return this.data
    }
    async update(pid: number, prod: IProduct) {
        // ???????????
    }
    async deleteOne(pid: number) {
        let del = this.data.filter(prod => prod.pID != pid)
        return del;
    }
    async deleteAll() {
        this.data = []
        return this.data
    }
}

export const ProductsModel = new ProductModel();
