import { IUser } from "../../interfaces";
import { createHash } from "../../utils";

// ALL MEMORY PERSISTENCY IS JUST FOR DEMONSTRATION
class UserModel {
    private data: any[]
    constructor() {
        this.data = [];
      }
    async getById(id: any) {
        let res = this.data.find(user => user.id === id);
        return res;
    }
    async getByEmail(email: string) {
        let res = this.data.find(user => user.email === email);
        return res;
    }
    async create(user: IUser) {
        this.data.push(user);
        return this.data
    }
}

export const UsersModel = new UserModel();
