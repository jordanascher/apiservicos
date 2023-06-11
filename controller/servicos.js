const servicoCadastro = require('../data/servicosCadastro')

function listar(req, res) {
    const idUsuario = req.params.idUsuario
    const listaServicos = servicoCadastro.listar(idUsuario);
    res.json(listaServicos);
}

function cadastrar(req, res) {
    let servico = req.body

    try {
        const novoServico = servicoCadastro.inserir(servico)
        res.status(200).json(novoServico)        
    } catch (err) {
        res.status(400).json(err.msg)
    }
}

function cancelar(req, res) {
    let id = req.params.id

    try {
        const cancela = servicoCadastro.cancelar(id)
        res.status(200).json(cancela)        
    } catch (err) {
        res.status(400).json(err.msg)
    }
}

module.exports = {
    listar,
    cadastrar,
    cancelar
}