export interface ICartItem {
    quantity: number;
    pID: number;
    _id: {
        category: string;
        description: string;
        image: string;
        owner: string;
        pID: number;
        price: number;
        stock: number;
        title: string;
        _id: string;
    };
}
