export interface IProducts {
    title: string;
    description: string;
    price: number;
    thumbnails: string[];
    code: string;
    stock: number;
    status: boolean;
    category: string;
    id?: number;
}
