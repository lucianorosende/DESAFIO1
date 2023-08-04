import { httpServer } from "../server";
import { Server } from "socket.io";
import { MessagesService } from "../services";

export const webSockets = () => {
    const socketServer = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });

    socketServer.on("connection", async (socket) => {
        let getMSG = await MessagesService.getMessages();
        socketServer.sockets.emit("messages", getMSG);
        console.log("Un cliente se ha conectado: " + socket.id);
        socket.on("newMsg", async (data) => {
            let saveMsg = await MessagesService.saveMessage(data);
            let getMSG = await MessagesService.getMessages();
            socketServer.sockets.emit("messages", getMSG);
        });
    });
};
