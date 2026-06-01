import express from 'express'
import mysql from 'mysql2/promise'

const port = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`)
})

// cadastrar -------------------------------------------------------------

app.post('/cadastrar', async (req, res) => {
  console.log(req.body)
  const nome = req.body.nome
  const email = req.body.email

  if (!nome) {
    return res.status(400).json({ erro: 'Você não informou o nome' })
  }

  if (!email) {
    return res.status(400).json({ erro: 'Você não informou o email' })
  }

  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'crud_node',
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

  return res.status(200).json({ rows })
})

// atualizar nome --------------------------------------------------------

app.put('/atualizar', async (req, res) => {
  const nomeAntigo = req.body.nomeAntigo
  const nomeNovo = req.body.nomeNovo

  if (!nomeAntigo || !nomeNovo) {
    return res.status(400).json({
      erro: 'Você não informou o nome',
    })
  }

  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'crud_node',
  })

  await connection.execute('UPDATE usuarios SET nome = ? WHERE nome = ?', [
    nomeNovo,
    nomeAntigo,
  ])

  return res.status(200).json({
    mensagem: 'Usuário atualizado',
  })
})

// atualizar email -------------------------------------------------------

app.put('/atualizarEmail', async (req, res) => {
  const nome1 = req.body.nome1
  const emailNovo = req.body.emailNovo

  if (!nome1 || !emailNovo) {
    return res.status(400).json({
      erro: 'Dados inválidos',
    })
  }

  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'crud_node',
  })

  await connection.execute('UPDATE usuarios SET email = ? WHERE nome = ?', [
    emailNovo,
    nome1,
  ])

  return res.status(200).json({
    mensagem: 'Usuário atualizado',
  })
})

// teste conexão ---------------------------------------------------------

async function main() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'crud_node',
  })

  console.log('Conectado ao MySQL')

  const [rows] = await connection.execute('SELECT * FROM usuarios')

  console.log(rows)

  await connection.end()
}

main().catch(console.error)

app.get('/visualizar', async (req, res) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'crud_node',
  })

  const [rows] = await connection.execute('SELECT * FROM usuarios')

  return res.status(200).json({ rows })
})

app.delete('/Deletar', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'crud_node',
    })

    console.log(req.body)

    const nomeDeletado = req.body.nomeDeletado

    await connection.execute('DELETE FROM usuarios WHERE nome = ?', [
      nomeDeletado,
    ])

    res.status(200).json({
      mensagem: 'Usuário deletado com sucesso',
    })
  } catch (erro) {
    console.error(erro)

    res.status(500).json({
      erro: erro.message,
    })
  }
})
