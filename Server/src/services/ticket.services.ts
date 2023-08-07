import { v4 as uuidv4 } from "uuid";
import { CartsModel } from "../DAO/MONGO";
import { TicketsModel } from "../DAO/MONGO/ticket.mongo";

class TicketService {
    async generateTicket(reqParams: any) {
        const { cid, email } = reqParams;
        const cart = await CartsModel.getById(cid);
        let date = new Date().toLocaleTimeString();
        let newTicket = {
            code: uuidv4(),
            purchase_datetime: date,
            amount: cart[0].products.length,
            purchaser: email,
        };
        let ticket = await TicketsModel.generateTicket(newTicket);
        return ticket;
    }
}

export const TicketsService = new TicketService();
