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

module.exports = {
    listar,
    cadastrar
}