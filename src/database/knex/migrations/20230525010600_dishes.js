exports.up = (knex) =>
  knex.schema.createTable('dishes', (table) => {
    table.increments('id')
    table.text('image').nullable()
    table.text('name')
    table.text('category')
    table.integer('price')
    table.text('description')
    // table
    //   .integer('userId')
    //   .references('id')
    //   .inTable('users')
    //   .onDelete('CASCADE')

    table.timestamp('createdAt').default(knex.fn.now())
    table.timestamp('updatedAt').default(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('dishes')
