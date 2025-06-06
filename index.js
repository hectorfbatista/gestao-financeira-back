require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const User = require('./models/User');

app.get('/', (req, res) => {
    res.status(200).json({msg: 'Bem vindo a nossa API! '})
});

app.post('/auth/register', async (req, res) => {

  const {name, email, password, confirmpassword} = req.body;

  if(!name) {
    return res.status(422).json({msg:  'nome é obrigatório' });
  }

  if(!email) {
    return res.status(422).json({msg: 'email é obrigatório'});
  }
  if(!password) {
    return res.status(422).json({msg: 'password é obrigatório'});
  }

  if(password !== confirmpassword) {
    return res.status(422).json({msg: 'As senhas não conferem'});
  }

  const userExists = await User.findOne({ email:email });

  if(userExists) {
    return res.status(422).json({msg: 'Email já cadastrado, utilize outro email'});
  }

})

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.yndni9h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    app.listen(3000)
    console.log('Conectou ao banco')
  })
  .catch((err) => console.log(err))