import express from "express";
import { register, login, getUserById } from "../controllers/authController.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/user/:id", checkToken, getUserById);

export default router;