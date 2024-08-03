import express from "express";
import {
  registerUser,
  authUser,
  getCurrentUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/user", getCurrentUser);

export default router;
