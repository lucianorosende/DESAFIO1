import winston from "winston";
import dotenv from "dotenv";
dotenv.config();

const changeLogger = (type: string | undefined) => {
    if (type === "DEVELOPMENT") {
        let logger: any = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    level: "debug",
                    format: winston.format.simple(),
                }),
                new winston.transports.File({
                    filename: "./errors.log",
                    level: "error",
                    format: winston.format.simple(),
                }),
            ],
        });
        return logger;
    }

    if (type === "PRODUCTION") {
        let logger: any = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    level: "info",
                    format: winston.format.simple(),
                }),
                new winston.transports.File({
                    filename: "./errors.log",
                    level: "error",
                    format: winston.format.simple(),
                }),
            ],
        });
        return logger;
    }
};
export let logger = changeLogger(process.env.LOGGER);
