exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.text('name')
    table.text('email')
    table.text('password')
    table.text('avatar').nullable()
    table.boolean('isAdmin').default(false)

    table.timestamp('createdAt').default(knex.fn.now())
    table.timestamp('updatedAt').default(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('users')
