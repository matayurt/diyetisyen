// import dotenv from "dotenv";
// import User from "../models/userModel.js";
// import connectDB from "../config/db.js";

// dotenv.config();
// connectDB();

// const createAdminUser = async () => {
//   try {
//     const adminUser = new User({
//       name: "Admin User",
//       email: "admin@example.com",
//       password: "Melikeadmin123", // Şifreyi hashleme işlemi modelde yapılacak
//       isAdmin: true,
//     });

//     const createdUser = await adminUser.save();
//     console.log("Admin User Created:", createdUser);
//     process.exit();
//   } catch (error) {
//     console.error("Error creating admin user:", error);
//     process.exit(1);
//   }
// };

// createAdminUser();
