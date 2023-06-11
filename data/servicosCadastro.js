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
}

function cancelar(idServico) {
    listaServicos.forEach(function(servico) {
        if (servico.id == idServico) {
            servico.status = false
            return {
                'message' : 'Serviço cancelado com sucesso!'
            }
        }
    })  
}

module.exports = { 
    listar,
    inserir,
    cancelar
}