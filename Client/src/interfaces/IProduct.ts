export interface IProduct {
    title: string;
    description: string;
    price: number;
    thumbnails: string[];
    code: string;
    stock: number;
    status: boolean;
    category: string;
    pID?: number;
}
