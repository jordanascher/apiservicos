const {Client} = require('pg');

const erroBD = {
    msg: "Erro de conexao no banco",
    numero: 500

}

const conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'admin123',
    database: 'Salao'
};

function inserir (servico, callback){
    const cliente = new Client (conexao);
    cliente.connect();

}
















c