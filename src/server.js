require('express-async-errors')
const AppError = require('./utils/AppError')
const uploadConfig = require('./configs/upload')

const cors = require('cors')
const express = require('express') // importo
const routes = require('./routes')

const app = express() // inicio o express
app.use(cors())
app.use(express.json()) // padrão que receberá as info pelo corpo da req

app.use('/files/dishImage', express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use((error, req, res, next) => {
  console.log(error)
  // verifica se a instacia do error vem de um AppError
  // e retorna se vem um erro do lado do cliente
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  // verifica se a instacia do error vem de um AppError
  // e retorna se vem um erro do lado do servidor
  console.log(error)
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

const PORT = 3333 // crio o numero da porta
app.listen(PORT, () => console.log(`Server ir running on Port ${PORT} 🚀`)) // aqui vai ficar escutando a porta que informei
