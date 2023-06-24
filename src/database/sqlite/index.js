const sqlite3 = require('sqlite3') // versão que irei conectar
const sqlite = require('sqlite') // responsavel conectar
const path = require('path')

// ao lidar com conexões com db usa-se async
// se nao existir um db ele vai criar se existir ele vai conectar
async function sqliteConnection() {
  const database = await sqlite.open({
    // file name diz onde vai ser salvo... __dirname pega de forma "automatica" onde está o projeto
    filename: path.resolve(__dirname, '..', 'database.db'),
    driver: sqlite3.Database,
  })

  return database
}

module.exports = sqliteConnection
