const agendamentoDB = require('./../persistencia/agendamentosPersistencia')

async function listar(idUsuario) {
    const listaAgendamentos = await agendamentoDB.listar(idUsuario);
    return listaAgendamentos;
}

async function inserir(agendamento) {
     if (valida(agendamento)){
        let response = await agendamentoDB.inserir(agendamento)

        if (response.error) {
            throw ({
                numero: 400,
                msg: response.message
            })
        }

        return response
    } else {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros do serviço estao invalidos"
        });
    }
}

function valida(agendamento) {
    if (agendamento.data_agenda && agendamento.hora_agenda && agendamento.id_cliente && agendamento.id_profissional && agendamento.id_servico){
        return true
    }

    return false
}

async function cancelar(id) {
    let response = await agendamentoDB.alterar(id, {
        "campo": "status",
        "valor": "f" 
    })

    if (response.error) {
        throw ({
            numero: 400,
            msg: response.message
        })
    }

    return response 
}

module.exports = { 
    listar,
    inserir,
    cancelar
}