//chama arquivo usuario cadastro
const usuarioCadastro = require('../data/usuariosCadastro')

// retorna o array que os usuários estão cadastrados e exibe em formato json
function listar(req, res) {
    const listaUsuarios = usuarioCadastro.listar();
    res.json(listaUsuarios);
}

function cadastrar(req, res) {
    let usuario = req.body

    try {
        const novoUsuario = usuarioCadastro.inserir(usuario)
        res.status(200).json(usuario)        
    } catch (err) {
        res.status(400).json(err.msg)
    }
}

function autentica(req, res) {
    try {
        const usuario = usuarioCadastro.autentica(req.body.email, req.body.senha)
        res.status(200).json(usuario)
    } catch (err) {
        res.status(400).json(err.msg)
    }
}

module.exports = {
    listar,
    cadastrar,
    autentica
}