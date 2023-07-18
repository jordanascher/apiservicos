const agendamentoCadastro = require('../data/agendamentosCadastro')

async function listar(req, res) {
    let idUsuario = req.params.idUsuario
    agendamentoCadastro.listar(idUsuario).then((agendamentos) => {
        res.status(200).json(agendamentos)
    })
}

async function cadastrar(req, res) {
    let agendamento = req.body

    agendamentoCadastro.inserir(agendamento).then((novoAgendamento) => {
        res.status(200).json(novoAgendamento)
    }).catch((e) => {
        res.status(400).json(e.msg)
    })
}

async function cancelar(req, res) {
    let id = req.params.id

    agendamentoCadastro.cancelar(id).then((agendamentoCancelado) => {
        res.status(200).json(agendamentoCancelado)
    }).catch((e) => {
        res.status(400).json(e.msg)
    })
}

module.exports = {
    listar,
    cadastrar,
    cancelar
}