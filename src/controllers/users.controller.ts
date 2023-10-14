import { Request, Response } from "express";
import { UsersService } from "../services";
import { customRequest, httpStatus } from "../utils";

class UserController {
    async changeRole(req: Request, res: Response) {
        let { uid } = req.params;
        let findUser = await UsersService.updateRole(uid);
        if (findUser.acknowledged) {
            res.render("roleChanged");
        }
    }
    async getUsers(req: Request, res: Response) {
        let getUsers = await UsersService.getUsers();
        customRequest(res, httpStatus.Ok, "success", "users Data", getUsers);
    }
    async deleteExpiredUsers(req: Request, res: Response) {
        let deleteUsers = await UsersService.deleteExpiredUsers();
        customRequest(
            res,
            httpStatus.Ok,
            "success",
            "users expired were Deleted",
            {}
        );
    }
}

export const UsersController = new UserController();
