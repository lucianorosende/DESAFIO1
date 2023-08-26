import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "../utils";
dotenv.config();

export async function MongoDB() {
    try {
        // Connect to MongoDB
        let url: string = process.env.MONGO_URL!;
        await mongoose.connect(url);
        logger.info("Connected to MongoDB");
    } catch (error) {
        logger.error("Error connecting to MongoDB:", error);
    }
}
