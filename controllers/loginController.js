const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const passport = require("../config/passport");


async function cadastro(req, res) {
  var nome = req.body.nome;
  var email = req.body.email;
  var senha = req.body.senha;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(senha, salt);
  const usuario = await Usuario.create({
    nome: nome,
    email: email,
    senha: hash,
  });
  res.redirect("/principal");
}



async function abreTela(req, res) {
  res.render("login/login.ejs");
}

async function cadastrar(req, res) {
    res.render("login/cadastro.ejs");
}

async function principal(req, res) {
  res.render("conteudo/principal.ejs");
}

const logar = passport.authenticate("local", {
  failureRedirect: "/", 
  successRedirect: "/principal",
});

module.exports = { abreTela, cadastro, cadastrar, logar, principal};
