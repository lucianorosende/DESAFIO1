import { app } from "../server";
import Express from "express";
import path from "path";
import { engine } from "express-handlebars";

export const publicAndHbs = () => {
    app.use(Express.static(path.join(__dirname, "../public")));
    app.engine("handlebars", engine());
    app.set("view engine", "handlebars");
    app.set("views", path.join(__dirname, "../views"));
};
