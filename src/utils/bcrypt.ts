import bcrypt from "bcrypt";

export const createHash = (password: string) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password: string, hashPassword: string) =>
    bcrypt.compareSync(password, hashPassword);
