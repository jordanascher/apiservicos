//chama arquivo usuario cadastro
const usuarioCadastro = require('../data/usuariosCadastro')

// retorna o array que os usuários estão cadastrados e exibe em formato json
async function listar(req, res) {
    const listaUsuarios = await usuarioCadastro.listar();
    res.status(200).json(listaUsuarios);
}

// retorna o array que os usuários estão cadastrados e exibe em formato json
async function listarProfissionais(req, res) {
    const listaUsuarios = await usuarioCadastro.listarProfissionais();
    res.status(200).json(listaUsuarios);
}

async function cadastrar(req, res) {
    let usuario = req.body

    usuarioCadastro.inserir(usuario).then((novoUsuario) => {
        res.status(200).json(novoUsuario)
    }).catch((e) => {
        res.status(400).json(e.msg)
    })
}

async function atualizar(req, res) {
    let usuario = req.body
    let id = req.params.id

    usuarioCadastro.alterar(id, usuario).then((usuarioAtualizado) => {
        res.status(200).json(usuarioAtualizado)
    }).catch((e) => {
        res.status(400).json(e.msg)
    })
}

async function deletar(req, res) {
    let id = req.params.id

    usuarioCadastro.deletar(id).then(() => {
        res.status(200).json('Usuário deletado com sucesso')
    }).catch((e) => {
        res.status(400).json(e.msg)
    })
}

function autentica(req, res) {
    usuarioCadastro.autentica(req.body.email, req.body.senha).then((usuarioLogado) => {
        if (usuarioLogado) {
            res.status(200).json(usuarioLogado)
        }
        res.status(400).json('Usuário/senha incorretos')
    })
}

module.exports = {
    listar,
    listarProfissionais,
    cadastrar,
    autentica,
    atualizar,
    deletar
}