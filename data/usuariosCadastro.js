
const usuarioDB = require('./../persistencia/usuarioPersistencia')

async function listar() {
    listaUsuarios = await usuarioDB.listar() 
    return listaUsuarios
}

async function listarProfissionais() {
    listaUsuarios = await usuarioDB.buscar({
        'campo': 'perfil',
        'valor': 'profissional'
    }) 
    return listaUsuarios
}

async function inserir(usuario) {
    if (valida(usuario)){
        if (!validaSenha){
            throw ({
                numero: 400,
                msg: "Erro: A senha confirmada deve ser igual a senha digitada."
            });  
        }

        let response = await usuarioDB.inserir(usuario)

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

async function alterar(id, usuario) {
    if (valida(usuario)){
        let response = await usuarioDB.alterar(id, usuario)

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

function valida(usuario) {
    if (usuario && usuario.nome && usuario.email && usuario.senha && usuario.confirmeSenha){
        return true
    }

    return false
}

function validaSenha(usuario) {
    if (usuario.senha !== usuario.confirmeSenha) {
        return false
    }
    return true
}

async function deletar(id) {
    let response = await usuarioDB.deletar(id)

    if (response.error) {
        throw ({
            numero: 400,
            msg: response.message
        })
    }

    return response
}

async function autentica(email, senha){
    let response = await usuarioDB.login(email, senha)

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
    listarProfissionais,
    inserir,
    autentica,
    alterar,
    deletar
}