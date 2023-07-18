const {Client} = require('pg');
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
    const res = await client.query('SELECT * FROM servicos');
    const listaServicos = res.rows;
    await client.end();
    return listaServicos;
}

async function inserir(servico){
    try {
        const sql = 'INSERT INTO servicos(nome_servico, lista_servico, valor_servico) VALUES ($1, $2, $3) RETURNING *'
        const values = [servico.nome_servico, servico.lista_servico, servico.valor_servico];
        const client = new Client(conexao);
        await client.connect();
        const res = await client.query(sql, values);
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

async function alterar(id, servico){
    try {
        const sql = 'UPDATE servicos SET nome_servico = $1, lista_servico = $2, valor_servico = $3 WHERE id_servico=$4 RETURNING *'
        const values = [servico.nome_servico, servico.lista_servico, servico.valor_servico, id];
        const client = new Client(conexao);
        await client.connect();
        const res = await client.query(sql, values);
        let servicoAtualizado = res.rows[0];
        await client.end();
        return servicoAtualizado;
    } catch (e) {
        return {
            'error': true,
            'message': e.message
        }
    }
}

async function deletar(id){
    try {
        const sql = 'DELETE FROM servicos WHERE id_servico=$1 RETURNING *'
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

module.exports = {
    inserir,
    listar,
    alterar,
    deletar
}