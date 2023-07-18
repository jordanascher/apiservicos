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

async function listar(idUsuario) {
    const client = new Client(conexao);
    await client.connect();
    const sql = 'SELECT * FROM agenda WHERE id_cliente=$1 AND status = $2';
    const values = [idUsuario, true];
    const res = await client.query(sql, values);
    const lista = res.rows;
    await client.end();
    return lista;
}

async function inserir(agendamento){
    try {
        const sql = 'INSERT INTO agenda(data_agenda, hora_agenda, id_cliente, id_profissional, id_servico) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [agendamento.data_agenda, agendamento.hora_agenda, agendamento.id_cliente, agendamento.id_profissional, agendamento.id_servico];
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

async function alterar(id, data){
    try {
        const sql = 'UPDATE agenda SET '+data.campo +'=$1 WHERE id_agenda=$2 RETURNING *'
        const values = [data.valor, id];
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
    alterar
}