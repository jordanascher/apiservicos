const servicoDB = require('./../persistencia/servicosPersistencia')

async function listar() {
    const listaServicos = await servicoDB.listar();
    return listaServicos;
}

async function inserir(servico) {
     if (valida(servico)){
        let response = await servicoDB.inserir(servico)

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

async function alterar(id, servico) {
    if (valida(servico)){
        let response = await servicoDB.alterar(id, servico)

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
            msg: "Erro: Os parametros do usuario estao invalidos"
        });
    }
}

async function deletar(id) {
    let response = await servicoDB.deletar(id)

    if (response.error) {
        throw ({
            numero: 400,
            msg: response.message
        })
    }

    return response
}

async function alterar(id, servico) {
    if (valida(servico)){
        let response = await servicoDB.alterar(id, servico)

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

function valida(servico) {
    if (servico.nome_servico && servico.lista_servico && servico.valor_servico){
        return true
    }

    return false
}

module.exports = { 
    listar,
    inserir,
    alterar,
    deletar
}