import jwt from "jsonwebtoken";
import User from "../models/User.js";  // IMPORTANDO o modelo do arquivo User.js

const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Acesso negado" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token inválido" });

  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;

    // Você pode consultar o usuário aqui se precisar
    // Exemplo:
    // const user = await User.findById(req.userId);
    // if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export default checkToken;