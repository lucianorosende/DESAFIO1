import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function MongoDB() {
    try {
        // Connect to MongoDB
        let url: string = process.env.MONGO_URL!;
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
