const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const DishesController = require('../controllers/DishesController')
// const DishesImageController = require('../controllers/DishesImageController')
const {
  ensureAuthenticated,
  isAdmin,
} = require('../middlewares/ensureAuthenticated')

const dishesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController() // instanciando na memória
// const dishesImageController = new DishesImageController() // instanciando na memória

dishesRoutes.use(ensureAuthenticated) // aplicando autenticação em todas as rotas

// user
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.get('/', dishesController.index)

// admin
dishesRoutes.post('/', isAdmin, upload.single('image'), dishesController.create)
dishesRoutes.put(
  '/:id',
  isAdmin,
  upload.single('image'),
  dishesController.update,
)
dishesRoutes.delete('/:id', isAdmin, dishesController.delete)

// dishesRoutes.patch(
//   '/dishesimg/:id',
//   isAdmin,
//   upload.single('image'),
//   dishesImageController.update,
// )

module.exports = dishesRoutes
