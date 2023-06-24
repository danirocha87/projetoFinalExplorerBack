const path = require('path')

module.exports = {
  development: {
    // debug: true,
    client: 'sqlite3',
    connection: {
      // buscar onde esta o banco de dados
      filename: path.resolve(__dirname, 'src', 'database', 'database.db'),
    },
    pool: {
      // habilitar a exclusção em cascata
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        'src',
        'database',
        'knex',
        'migrations',
      ),
    },
    useNullAsDefault: true,
  },
}
