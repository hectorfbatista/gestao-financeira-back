import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function register(req, res) {
  const { name, email, password, confirmpassword } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ msg: 'Todos os campos são obrigatórios' });
  }

  if (password !== confirmpassword) {
    return res.status(422).json({ msg: 'As senhas não conferem' });
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ msg: 'Email já cadastrado' });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ msg: 'Usuário criado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor. Tente novamente mais tarde.' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ msg: 'Todos os campos são obrigatórios' });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado' });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: 'Senha inválida' });
  }

  try {
    const secret = process.env.JWT_SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({ msg: "Autenticação realizada com sucesso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor. Tente novamente mais tarde.' });
  }
}

async function getUserById(req, res) {
  const id = req.params.id;

  try {
    const user = await User.findById(id, '-password');

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro ao buscar usuário.' });
  }
}

export { register, login, getUserById };