import express from "express";
import { getClients, createClient, deleteClient, putClient } from "../controllers/clientController.js";
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.get("/clients", checkToken, getClients);
router.post("/clients", checkToken, createClient);
router.delete("/clients/:id", checkToken, deleteClient);
router.put("/clients/:id", checkToken, putClient);

export default router;
