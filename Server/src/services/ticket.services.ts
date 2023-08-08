import { v4 as uuidv4 } from "uuid";
import { CartsModel } from "../DAO/MONGO";
import { TicketsModel } from "../DAO/MONGO/ticket.mongo";

class TicketService {
    async generateTicket(reqParams: any, rejected: any) {
        const { cid, email } = reqParams;
        const cart = await CartsModel.getById(cid);
        if (cart[0].products.length - rejected.length < 1) {
            return false;
        }
        let date = new Date().toLocaleTimeString();
        let newTicket = {
            code: uuidv4(),
            purchase_datetime: date,
            amount: cart[0].products.length - rejected.length,
            purchaser: email,
            rejectedProds: rejected,
        };
        let ticket = await TicketsModel.generateTicket(newTicket);
        return ticket;
    }
}

export const TicketsService = new TicketService();
