import { productRouter, cartRouter } from "./routes";
import Express, { Request, Response } from "express";
import handlebars, { engine } from "express-handlebars";
import path from "path";
import { Server } from "socket.io";
import { newProduct } from "./classes";

// Initializing Express -------------------------------------------------------------------------------------------------------------
const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(Express.static(path.join(__dirname, "public")));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
const PORT: number = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Example app listening on http://localhost:${PORT}`);
});

const socketServer = new Server(httpServer);
app.get("/", async (req, res) => {
    let getProds = await newProduct.getProducts();
    res.render("home", { prod: getProds });
});

socketServer.on("connection", (socket) => {
    console.log("Un cliente se ha conectado: " + socket.id);
    socket.on("msg_front_to_back", (data) => {
        console.log(JSON.stringify(data));
    });

    socket.emit("msg_back_to_front", { msg: "hola desde el back al socket" });

    socket.broadcast.emit("msg_back_to_todos_menos_socket", {
        msg: "hola desde el back a todos menos el socket",
    });

    socketServer.emit("msg_back_todos", { msg: "hola desde el back a todos" });
});

// Initializing Routes --------------------------------------------------------------------------------------------------------------
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// Handling Errors ------------------------------------------------------------------------------------------------------------------
app.on("error", (err) => console.log("server error: " + err));

app.get("*", (req: Request, res: Response) => {
    res.status(404).json({ status: "error", msg: "route not found", data: {} });
});

// app.post("*", (req: Request, res: Response) => {
//     res.status(404).json({ status: "error", msg: "route not found", data: {} });
// });
