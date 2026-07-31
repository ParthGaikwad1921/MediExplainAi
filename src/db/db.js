import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

async function connectDB(){
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`);
        console.log(`MONGO DB CONNECTED : ${connect.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error : ",error);
        process.exit(1);
    }
}

export default connectDB;