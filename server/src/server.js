import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/database.js";

import itemRoutes from "./routes/itemRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(
    cors({
        origin: "http://localhost:5173"
    })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/cart", cartRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port: 5000");
    })
});