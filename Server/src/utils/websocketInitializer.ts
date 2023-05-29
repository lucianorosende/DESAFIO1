import { httpServer } from "../server";
import { Server } from "socket.io";
import { newProduct } from "../classes";

export const webSocketInitializer = () => {
    const socketServer = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });

    socketServer.on("connection", async (socket) => {
        console.log("Un cliente se ha conectado: " + socket.id);
        socket.on("deploy", async (data) => {
            if (data === "deploy") {
                socket.emit("products", await newProduct.getProducts());
            }
        });
        socket.on("newProduct", async (data) => {
            await newProduct.addProduct(data);
            socketServer.sockets.emit(
                "products",
                await newProduct.getProducts()
            );
        });
        socket.on("deleteOneProduct", async (data) => {
            await newProduct.deleteProduct(data);
            socketServer.sockets.emit(
                "products",
                await newProduct.getProducts()
            );
        });
        socket.on("deleteProducts", async (data) => {
            if (data === "delete") {
                await newProduct.deleteAllProducts();
                socketServer.sockets.emit(
                    "products",
                    await newProduct.getProducts()
                );
            }
        });
    });
};
