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
}

export const UsersController = new UserController();
