const express = require('express');
const routes = require('./config/routes')

const app = express();
const PORTA = 3000;

app.use(express.json());

app.use('/', routes);

app.listen(PORTA, () => {
    console.log("Servidor iniciado com sucesso...")
})

module.exports = app