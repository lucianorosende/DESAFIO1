import { Response } from "express";

export let customRequest = (
    res: Response,
    httpStatus: number,
    status: string,
    msg: string,
    data: any
) => {
    res.status(httpStatus).json({
        status: status,
        msg: msg,
        data: data,
    });
};
