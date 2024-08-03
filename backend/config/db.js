import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MongoDB_URI = process.env.MongoDB_URI;

const ConnectDB = async () => {
  try {
    await mongoose.connect(MongoDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected.");
  } catch (error) {
    console.error("MongoDB Connection Error: ", error);
    process.exit(1);
  }
};

export default ConnectDB;
