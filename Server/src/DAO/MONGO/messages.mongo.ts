import { MessageMongooseModel } from "./models";

class MessageModel {
    async getMessages() {
        let data = await MessageMongooseModel.find({});
        return data;
    }
    async saveMessage(message: any) {
        let data = await MessageMongooseModel.create(message);
        return data;
    }
}

export const MessagesModel = new MessageModel();
