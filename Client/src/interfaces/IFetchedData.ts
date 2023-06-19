import { IProduct } from "./IProduct";
import { IPagination } from "./IPagination";

export interface IFetchedData {
    pagination: IPagination;
    prod: IProduct[];
}
