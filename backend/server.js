import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

ConnectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
