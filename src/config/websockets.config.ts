import { httpServer } from "../server";
import { Server } from "socket.io";
import { MessagesService } from "../services";
import { logger } from "../utils";

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
        // logger.info("Un cliente se ha conectado: " + socket.id);
        socket.on("newMsg", async (data) => {
            socketServer.sockets.emit("messages", data);
        });
        socketServer.sockets.emit(
            "messageHistory",
            await MessagesService.getMessages()
        );
    });
};
