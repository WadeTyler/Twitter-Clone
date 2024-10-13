
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

// Middleware
app.use(express.json());    // to parse req.body
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Routing
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});