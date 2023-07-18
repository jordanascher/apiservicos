const express = require('express');
const usuariosController = require('./../controller/usuarios')
const servicosController = require('./../controller/servicos')
const agendamentosController = require('./../controller/agendamentos')

const router = express.Router();

router.get('/usuarios', usuariosController.listar);
router.post('/usuarios/cadastrar', usuariosController.cadastrar);
router.post('/usuarios/login', usuariosController.autentica);
router.put('/usuarios/atualizar/:id', usuariosController.atualizar);
router.delete('/usuarios/:id', usuariosController.deletar);

router.get('/servicos', servicosController.listar);
router.post('/servicos/cadastrar', servicosController.cadastrar);

router.get('/profissionais', usuariosController.listarProfissionais);

router.get('/agendamentos/:idUsuario', agendamentosController.listar);
router.post('/agendamentos/cadastrar', agendamentosController.cadastrar);
router.delete('/agendamentos/cancelar/:id', agendamentosController.cancelar)

module.exports = router;

