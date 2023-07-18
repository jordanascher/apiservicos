const servicoCadastro = require('../data/servicosCadastro')

async function listar(req, res) {
    servicoCadastro.listar().then((servicos) => {
        res.status(200).json(servicos)
    })
}

async function cadastrar(req, res) {
    let servico = req.body

    servicoCadastro.inserir(servico).then((novoServico) => {
        res.status(200).json(novoServico)
    }).catch((e) => {
        res.status(400).json(e.msg)
    })
}

async function atualizar(req, res) {
    let servico = req.body
    let id = req.params.id

    servicoCadastro.alterar(id, servico).then((servicoAtualizado) => {
        res.status(200).json(servicoAtualizado)
    }).catch((e) => {
        res.status(400).json(e.msg)
    })
}

async function deletar(req, res) {
    let id = req.params.id

    servicoCadastro.deletar(id).then(() => {
        res.status(200).json('Serviço deletado com sucesso')
    }).catch((e) => {
        res.status(400).json(e.msg)
    })
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar
}