import { log } from "console";
import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connection.on("error", (err) => {
            console.log("something goes wrong while connecting to database"+ err);
            process.exit();
        });
    } catch (error) {
        console.log("something goes wrong while connecting to database");
        console.log(error);
    }
}
