import { MessagesModel } from "../DAO/MONGO";

class MessageService {
    async getMessages() {
        let data = await MessagesModel.getMessages();
        return data;
    }
    async saveMessage(message: any) {
        let data = await MessagesModel.saveMessage(message);
        return data;
    }
}

export const MessagesService = new MessageService();
