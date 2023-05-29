import { app } from "../server";
import { Request, Response } from "express";
import { httpStatus } from ".";

export const routeErrors = (): void => {
    app.on("error", (err) => console.log("server error: " + err));
    app.all("*", (req: Request, res: Response) => {
        res.status(httpStatus.NotFound).json({
            status: "error",
            msg: "route not found",
            data: {},
        });
    });
};
