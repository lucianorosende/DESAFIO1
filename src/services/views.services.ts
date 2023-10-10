import { ICart, IProductPages } from "../interfaces";

class ViewService {
    async productData(prod: IProductPages) {
        let paginateData = {
            status: prod.status,
            totalPages: prod.totalPages,
            prevPage: prod.prevPage,
            nextPage: prod.nextPage,
            page: prod.page,
            hasPrevPage: prod.hasPrevPage,
            hasNextPage: prod.hasNextPage,
            prevLink: prod.prevPage,
            nextLink: prod.nextPage,
        };
        return paginateData;
    }
    async cartData(cart: ICart[]) {
        const formattedData = cart[0].products.map((item) => ({
            title: item._id?.title,
            description: item._id?.description,
            price: item._id?.price,
            thumbnails: item._id?.thumbnail,
            code: item._id?.code,
            stock: item._id?.stock,
            status: item._id?.status,
            category: item._id?.category,
            quantity: item.quantity,
            pID: item.pID,
            _id: item._id?._id,
            __v: item._id?.__v,
        }));
        return formattedData;
    }
    async roleData(role: string) {
        if (role === "premium") {
            return role;
        }
        return;
    }
}

export const ViewsService = new ViewService();
