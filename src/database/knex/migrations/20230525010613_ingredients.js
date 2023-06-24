exports.up = (knex) =>
  knex.schema.createTable('ingredients', (table) => {
    table.increments('id')
    table.text('name')
    table
      .integer('dishId')
      .references('id')
      .inTable('dishes')
      .onDelete('CASCADE')

    table.timestamp('createdAt').default(knex.fn.now())
    table.timestamp('updatedAt').default(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('ingredients')
