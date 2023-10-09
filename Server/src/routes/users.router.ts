import Express from "express";
import { asyncHandler } from "../utils";
import { UsersController } from "../controllers";

export const userRouter = Express.Router();

userRouter.get("/premium/:uid", asyncHandler(UsersController.changeRole));
userRouter.get("/", asyncHandler(UsersController.getUsers));
