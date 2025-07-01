import express from "express";
import { getAgenda, createAgenda, deleteAgenda, putAgenda } from "../controllers/agendaController.js";
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.get("/agendas", checkToken, getAgenda);
router.post("/agendas", checkToken, createAgenda);
router.delete('/agendas/:id', checkToken, deleteAgenda);
router.put("/agendas/:id", checkToken, putAgenda);

export default router;