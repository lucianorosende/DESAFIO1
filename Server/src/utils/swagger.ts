import swaggerUI from "swagger-ui-express";
import swaggerjsdoc from "swagger-jsdoc";
import { app } from "../server";

export function swagImplementer() {
    const options = {
        definition: {
            openapi: "3.0.3",
            info: {
                title: "My API",
                version: "1.0.0",
                description: "This is my API.",
            },
            servers: [
                {
                    url: "http://localhost:8080",
                },
            ],
            paths: {},
        },
        apis: [`${__dirname}/../docs/**/*.yaml`],
    };
    const swag = swaggerjsdoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swag));
}
