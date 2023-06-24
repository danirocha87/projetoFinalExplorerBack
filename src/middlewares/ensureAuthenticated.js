const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')
const knex = require('../database/knex')

// os middleware recebem um next par chamar a proxima function
function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token não informado', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, authConfig.jwt.secret)

    req.user = {
      id: Number(userId),
    }

    return next()
  } catch (err) {
    throw new AppError('JWT Token inválido', 401)
  }
}

async function isAdmin(req, res, next) {
  const userId = req.user.id

  const user = await knex('users').where({ id: userId }).first()

  if (!user.isAdmin) {
    throw new AppError('Usuário não é um admin', 401)
  }

  next()
}

module.exports = {
  ensureAuthenticated,
  isAdmin,
}
