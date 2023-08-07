import { ticketMongooseModel } from "./models";

class TicketModel {
    async generateTicket(ticket: any) {
        let tickets = await ticketMongooseModel.create(ticket);
        return tickets;
    }
}

export const TicketsModel = new TicketModel();
