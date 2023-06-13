let listaUsuarios = [];
let idAutoIncrement = 1;

function listar() {
    return listaUsuarios;
}

function inserir(usuario) {
    if (usuario && usuario.nome && usuario.email && usuario.senha && usuario.confirmeSenha){
        listaUsuarios.forEach(function(item){
            if (usuario.email === item.email ) {
                throw ({
                    numero: 400,
                    msg: "Erro: Já existe usuário com este email."
                });  
            }
        })
        if (usuario.senha !== usuario.confirmeSenha){
            throw ({
                numero: 400,
                msg: "Erro: A senha confirmada deve ser igual a senha digitada."
            });  
        }
        
        usuario.id = idAutoIncrement++;
        listaUsuarios.push(usuario);
        return usuario;
    } else {
        throw ({
            numero: 400,
            msg: "Erro: Os parametros do usuario estao invalidos"
        });
    }
}

function autentica(email, senha){
    let usuarioAutenticado = null

    listaUsuarios.forEach(function(usuario) {
        if (usuario.email == email) {
            if (usuario.senha == senha) {
               usuarioAutenticado = usuario 
            } else {
                throw ({
                    numero: 400,
                    msg:"Usuário/senha incorretos"
                });   
            }
        } 
    })

    if (usuarioAutenticado) {
        return usuarioAutenticado
    } else {
        throw ({
            numero: 400,
            msg: 'Nenhum usuário cadastrado para este email'
        });
    }
}

module.exports = { 
    listar,
    inserir,
    autentica
}