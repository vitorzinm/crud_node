import express from 'express'

const port = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`)
})

app.post('/usuarios', async (req, res) => {
  const nome = req.body.nome
  const email = req.body.email

  if (!nome) {
    return res.json({ erro: 'Você não informou o nome' }).status(400)
  }

  if (!email) {
    return res.json({ erro: 'Você não informou o email' }).status(400)
  }

  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'qualquer',
  })

  await connection.execute(`
      CREATE TABLE IF NOT EXISTS usuarios ( 
        id INT PRIMARY KEY AUTO_INCREMENT, 
        nome VARCHAR(300),
        email VARCHAR(200) 
      )   
    `)

  await connection.execute('INSERT INTO usuarios (nome,email) VALUES (?, ?)', [
    nome,
    email,
  ])

  const [rows] = await connection.execute('SELECT * FROM usuarios')
  return res.json({ rows }).status(200)
})

import mysql from 'mysql2/promise'

async function main() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'qualquer',
  })

  console.log('Conectado ao MySQL')

  // await connection.execute(`
  //   CREATE TABLE IF NOT EXISTS teste (
  //     id INT PRIMARY KEY AUTO_INCREMENT,
  //     sla VARCHAR(100),
  //   )
  // `);

  // await connection.execute('INSERT INTO teste (sla,idade) VALUES (?, ?)', [
  //   'aoiwjhfoiawjefiwjae',
  //   25,
  // ])

  let rows
  ;[rows] = await connection.execute('SELECT * FROM teste')
  console.log(rows)
  ;[rows] = await connection.execute('SELECT idade FROM teste')
  console.log(rows)
  await connection.end()
}

main().catch(console.error)
