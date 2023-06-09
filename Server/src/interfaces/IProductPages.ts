import { IProduct } from ".";

export interface IProductPages {
    status: string;
    payload: IProduct[];
    totalPages: number;
    prevPage: number | null;
    nextPage: number | null;
    page: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevLink: number | null;
    nextLink: number | null;
}
