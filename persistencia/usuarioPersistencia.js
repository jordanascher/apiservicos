const {Client} = require('pg');
const pgError = require("pg-error");
const { response } = require('../app');

const erroBD = {
    msg: "Erro de conexao no banco",
    numero: 500
}

const conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '12345',
    database: 'salao'
};

async function listar() {
    const client = new Client(conexao);
    await client.connect();
    const res = await client.query('SELECT * FROM usuarios')
    const listaUsuarios = res.rows;
    await client.end();
    return listaUsuarios;
}

async function buscar(search) {
    const client = new Client(conexao);
    await client.connect();
    const sql = 'SELECT * FROM usuarios WHERE '+search.campo+'=$1';
    const values = [search.valor] 
    const res = await client.query(sql, values)
    const listaUsuarios = res.rows;
    await client.end();
    return listaUsuarios;
}

async function inserir(usuario){
    try {
        const sql = 'INSERT INTO usuarios(nome_usuario, email, senha, perfil, telefone, endereco, numero, cep) VALUES ($1, $2, MD5($3), $4, $5, $6, $7, $8 ) RETURNING *'
        const values = [usuario.nome, usuario.email, usuario.senha, usuario.perfil, usuario.telefone, usuario.endereco, usuario.numero, usuario.cep];
        const client = new Client(conexao);
        await client.connect();
        const res   = await client.query(sql, values);
        const id = res.rows[0];
        await client.end();
        return id;
    } catch (e) {
        return {
            'error': true,
            'message': e.message
        }
    }
}

async function alterar(id, usuario){
    try {
        const sql = 'UPDATE usuarios SET nome_usuario = $1, email = $2, senha = MD5($3), perfil = $4, telefone = $5, endereco = $6, numero = $7, cep = $8 WHERE id_usuario=$9 RETURNING *'
        const values = [usuario.nome, usuario.email, usuario.senha, usuario.perfil, usuario.telefone, usuario.endereco, usuario.numero, usuario.cep, id];
        const client = new Client(conexao);
        await client.connect();
        const res = await client.query(sql, values);
        let usuarioAtualizado = res.rows[0];
        await client.end();
        return usuarioAtualizado;
    } catch (e) {
        return {
            'error': true,
            'message': e.message
        }
    }
}

async function deletar(id){
    try {
        const sql = 'DELETE FROM usuarios WHERE id_usuario=$1 RETURNING *'
        const values = [id];
        const client = new Client(conexao);
        await client.connect();
        const res = await client.query(sql, values);
        let response = res.rows[0];
        await client.end();
        return response;
    } catch (e) {
        return {
            'error': true,
            'message': e.message
        }
    }
}

async function login(email, senha){
    const sql = 'SELECT * FROM usuarios WHERE email=$1 AND senha=MD5($2)'
    const values = [email, senha];
    const client = new Client(conexao);
    await client.connect();
    const res = await client.query(sql, values);
    let usuarioLogado = res.rows[0];
    await client.end();
    return usuarioLogado;
}

module.exports = {
    inserir,
    listar,
    buscar,
    login,
    alterar,
    deletar
}