import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bugRoutes from "./routes/bugRoutes.js";

dotenv.config(); // ✅ Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/bugs", bugRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.MONGO_DB,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

import authRoutes from "./routes/Auth.js";

app.use(express.json());
app.use("/api/auth", authRoutes);
