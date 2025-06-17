import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDataBase from "./database/db.js";
import authRoutes from "./routes/authRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", servicesRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "API funcionando" });
});

connectDataBase()
  .then(() => {
    app.listen(3000, () => console.log("Servidor rodando na porta 3000 🚀"));
  })
  .catch((error) => console.log(error));
