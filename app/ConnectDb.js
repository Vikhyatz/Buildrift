import mongoose from "mongoose";

import dns from "dns";


const connectDb = async () => {
    try {
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
        const con = await mongoose.connect(process.env.URI);
        console.log("Connected to MongoDB", con.connection.host);
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        throw err; // important
    }
};

export default connectDb;