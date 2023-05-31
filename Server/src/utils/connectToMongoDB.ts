import mongoose from "mongoose";

export async function connectToMongoDB() {
    try {
        // Connect to MongoDB
        await mongoose.connect(
            "mongodb+srv://coderhouse:GKgNLrpzhKz9dYr3@proyect-ch.zgwmzwc.mongodb.net/?retryWrites=true&w=majority"
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
