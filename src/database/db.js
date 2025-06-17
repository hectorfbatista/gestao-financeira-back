import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

async function connectDataBase() {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.wtnwmop.mongodb.net/`
    );
    console.log("✅ Conexão com o banco de dados MongoDB estabelecida!");
  } catch (error) {
    console.error("❌ Erro ao conectar com o MongoDB:", error);
    throw error;
  }
}

export default connectDataBase;