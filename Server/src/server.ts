import Express from "express";
import { routeErrors } from "./functions/routeErrors";
import { Server } from "socket.io";
import { routeInitializer, publicAndHbs } from "./functions";
import { newProduct } from "./classes";
import cors from "cors";

// Initializing Express -------------------------------------------------------------------------------------------------------------
export const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());
const PORT: number = 8080;

// Initializing public and hbs Engine
publicAndHbs();

const httpServer = app.listen(PORT, () => {
    console.log(`Example app listening on http://localhost:${PORT}`);
});

export const socketServer = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

socketServer.on("connection", async (socket) => {
    console.log("Un cliente se ha conectado: " + socket.id);

    socket.on("deploy", async (data) => {
        if (data === "deploy") {
            socket.emit("tableProducts", await newProduct.getProducts());
        }
    });
});

// Initializing Routes --------------------------------------------------------------------------------------------------------------
routeInitializer();

// Handling Errors ------------------------------------------------------------------------------------------------------------------
routeErrors();
