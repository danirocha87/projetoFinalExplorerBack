const { Router } = require('express')

const SessionsController = require('../controllers/SessionsController')

const usersRoutes = Router()

const sessionsController = new SessionsController() // instanciando na memória

usersRoutes.post('/', sessionsController.create)

module.exports = usersRoutes
