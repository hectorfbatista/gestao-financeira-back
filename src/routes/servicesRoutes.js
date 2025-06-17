import express from "express";
import { getService, createService, deleteService, putService } from "../controllers/serviceController.js";
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.get("/services", checkToken, getService);
router.post("/services", checkToken, createService);
router.delete("/services/:id", checkToken, deleteService);
router.put("/services/:id", checkToken, putService);

export default router;