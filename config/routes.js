const express = require('express');
const usuariosController = require('./../controller/usuarios')
const servicosController = require('./../controller/servicos')

const router = express.Router();

router.get('/usuarios', usuariosController.listar);
router.post('/usuarios/cadastrar', usuariosController.cadastrar);
router.post('/usuarios/login', usuariosController.autentica);

router.get('/servicos/:idUsuario', servicosController.listar);
router.post('/servicos/cadastrar', servicosController.cadastrar);
router.delete('/servicos/cancelar/:id', servicosController.cancelar);

module.exports = router;

