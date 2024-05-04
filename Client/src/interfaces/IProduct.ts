export interface IProduct {
    title: string;
    description: string;
    price: number;
    thumbnail: string[];
    code: string;
    stock: number;
    status: boolean;
    category: string;
    image: string;
    quantity?: number;
    rating: number;
    owner?: string;
    pID?: number;
}
