const knex = require('../database/knex')
const DiskStorage = require('../providers/DiskStorage')
const AppError = require('../utils/AppError')

class DishesImageController {
  async update(req, res) {
    const { id } = req.params

    const dishFilename = req.file.filename
    console.log(id)

    const diskStorage = new DiskStorage()

    try {
      const dish = await knex('dishes').where({ id }).first()

      if (dish && dish.image) {
        await diskStorage.deleteFile(dish.image)
      }

      const filename = await diskStorage.saveFile(dishFilename)

      await knex('dishes').where({ id }).update({ image: filename })

      const updatedDish = await knex('dishes').where({ id }).first()

      return res.json(updatedDish)
    } catch (error) {
      console.error(error)
      return AppError.json({ error: 'Failed to update dish image' }, 500)
    }
  }
}

module.exports = DishesImageController
