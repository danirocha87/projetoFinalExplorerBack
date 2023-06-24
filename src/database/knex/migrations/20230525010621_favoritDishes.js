exports.up = (knex) =>
  knex.schema.createTable('favoritDishes', (table) => {
    table.increments('id')
    table
      .integer('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table
      .integer('dishId')
      .references('id')
      .inTable('dishes')
      .onDelete('CASCADE')

    table.timestamp('createdAt').default(knex.fn.now())
    table.timestamp('updatedAt').default(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('favoritDishes')
