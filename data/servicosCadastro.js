let listaServicos = [];
let idAutoIncrement = 1;

function listar(idUsuario) {
    let servicosUsuario = []

    listaServicos.forEach(function(servico) {
        if (servico.idUsuario == idUsuario && servico.status) {
            servicosUsuario.push(servico)
        }
    })

    return servicosUsuario;
}

function inserir(servico) {
    servico.id = idAutoIncrement++;
    servico.status = true
    listaServicos.push(servico);
    return servico
}

function cancelar(idServico) {
    let cancelou = false

    listaServicos.forEach(function(servico) {
        if (servico.id == idServico) {
            servico.status = false
            cancelou = true
        }
    })
    
    if (cancelou) {
        return {
            'message' : 'Serviço cancelado com sucesso!'
        }
    } else {
        return {
            'message' : 'Serviço não encontrado!'
        }
    }
}

module.exports = { 
    listar,
    inserir,
    cancelar
}