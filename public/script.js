const butaoCadatro = document.getElementById('butaoCadatro')
const butaoAtualizar = document.getElementById('butaoAtualizar')
const butaoAtualizarEmail = document.getElementById('butaoAtualizarEmail')
const butaoDeletar = document.getElementById('deletar')
const direcionadorNome = document.getElementById('direcionadorNome')
const direcionadorEmail = document.getElementById('direcionadorEmail')
const voltar = document.getElementById('voltar')
const voltar1 = document.getElementById('voltar1')

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault()

    if (event.target.id === 'email') {
      butaoCadatro.click()
    }

    if (event.target.id === 'nomeNovo' || event.target.id === 'nomeAntigo') {
      butaoAtualizar.click()
    }

    if (event.target.id === 'nome1' || event.target.id === 'nomeEmail') {
      butaoAtualizarEmail.click()
    }

    if (event.target.id === 'nomeDeletado') {
      butaoDeletar.click()
    }
  }
})
voltar1.addEventListener('click', function(){
  const atualizacoesBotao = document.getElementById('atualizacoesBotao')
  const atualizacoes = document.getElementById('atualizacoes')
  const atulizacaoemail = document.getElementById('atulizacaoemail')
  const atualizacaoNome = document.getElementById('atualizacaoNome')

  atualizacoes.style.display = 'none'
  atualizacoesBotao.style.display = 'flex'
  atulizacaoemail.style.display = 'none'
  atualizacaoNome.style.display = 'none'
})
voltar.addEventListener('click', function(){
  const atualizacoesBotao = document.getElementById('atualizacoesBotao')
  const atualizacoes = document.getElementById('atualizacoes')
  const atulizacaoemail = document.getElementById('atulizacaoemail')
  const atualizacaoNome = document.getElementById('atualizacaoNome')

  atualizacoes.style.display = 'none'
  atualizacoesBotao.style.display = 'flex'
  atulizacaoemail.style.display = 'none'
  atualizacaoNome.style.display = 'none'
})
direcionadorNome.addEventListener('click', function(){
  const atualizacoesBotao = document.getElementById('atualizacoesBotao')
  const atualizacoes = document.getElementById('atualizacoes')
  const atulizacaoemail = document.getElementById('atulizacaoemail')
  const atualizacaoNome = document.getElementById('atualizacaoNome')
  
  atualizacoes.style.display = 'flex'
  atualizacoesBotao.style.display = 'none'
  atulizacaoemail.style.display = 'none'
  atualizacaoNome.style.display = 'flex'
})
butaoAtualizar.addEventListener('click', function(){
  const atualizacoes = document.getElementById('atualizacoes')
  const atualizacoesBotao = document.getElementById('atualizacoesBotao')
  const atulizacaoemail = document.getElementById('atulizacaoemail')
  const atualizacaoNome = document.getElementById('atualizacaoNome')

  atualizacoes.style.display = 'flex'
  atualizacoesBotao.style.display = 'none'
  atulizacaoemail.style.display = 'flex'
  atualizacaoNome.style.display = 'none'
})

// deletar ---------------------------------------------------------------
butaoDeletar.addEventListener('click', async e => {
  e.preventDefault()
  
  const nomeDeletado = document.getElementById('nomeDeletado').value

  if (nomeDeletado.length >= 300) {
    alert('Isso n é nome')
    return
  }
  
  if (nomeDeletado == '') {
    alert('Por favor inserir um valor a nome')
    return
  }
  
  const response = await fetch('/Deletar', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nomeDeletado,
  }),
})

const data = await response.json()

  if (data) {
    alert('Deletado com sucesso!!!')
  } else {
    alert('Erro')
  }
})

// atualizar email -------------------------------------------------------
butaoAtualizarEmail.addEventListener('click', async e => {
  e.preventDefault()

  const nome1 = document.getElementById('nome1').value
  const emailNovo = document.getElementById('nomeEmail').value

  if (nome1.length >= 300) {
    alert('Isso n é nome')
    return
  }

  if (emailNovo.length >= 200) {
    // alert('Email invalido')
    return
  }

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

  if (!emailRegex.test(emailNovo)) {
    // alert('Email invalido')
    return
  }

  if (emailNovo == '') {
    alert('Por favor inserir um valor em Email')
    return
  }

  if (nome1 == '') {
    alert('Por favor inserir um valor a nome')
    return
  }

  const response = await fetch('/atualizarEmail', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome1,
      emailNovo,
    }),
  })

  const data = await response.json()

  if (data) {
    alert('Atualizado com sucesso!!!')
  } else {
    alert('Erro')
  }
})

// atualizar nome --------------------------------------------------------

butaoAtualizar.addEventListener('click', async e => {
  e.preventDefault()

  const nomeAntigo = document.getElementById('nomeAntigo').value
  const nomeNovo = document.getElementById('nomeNovo').value

  if (nomeAntigo.length >= 300 || nomeNovo.length >= 300) {
    alert('Isso n é nome')
    return
  }

  if (nomeNovo == '' || nomeAntigo == '') {
    alert('Por favor preencha corretamente.')
    return
  }

  const response = await fetch('/atualizar', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nomeAntigo,
      nomeNovo,
    }),
  })

  const data = await response.json()

  console.log(data)

  if (data) {
    alert('Atualizado com sucesso!!')
  } else {
    alert('Erro')
  }
})

// cadastrar -------------------------------------------------------------

butaoCadatro.addEventListener('click', async e => {
  e.preventDefault()

  const nome = document.getElementById('nome').value
  const email = document.getElementById('email').value

  if (nome.length >= 300) {
    alert('Atingiu o limite de letras')
    // document.getElementById('nome').style.borderColor = 'red'
    return
  }

  if (email.length >= 200) {
    // document.getElementById('email').style.borderColor = 'red'
    return
  }

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

  if (!emailRegex.test(email)) {
    alert('Email invalido')
    //  document.getElementById('email').style.borderColor = 'red'
    return
  }

  if (nome == '') {
    // document.getElementById('nome').style.borderColor = 'red'
    alert('Por favor preencha o nome')
    return
  }

  const response = await fetch('/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome,
      email,
    }),
  })

  const data = await response.json()

  console.log(data)

  if (data) {
    document.getElementById('nome').style.borderColor = 'green'
    document.getElementById('email').style.borderColor = 'green'
    document.getElementById('cadastro').style.borderColor = 'green'
  } else {
    alert('Erro')
  }
})
const tabela = document.getElementById('tabela')
const response = await fetch('/visualizar')
const data = await response.json()

data.rows.forEach(usuario => {
  tabela.innerHTML += `
    <tr>
      <td>${usuario.id}</td>
      <td>${usuario.nome}</td>
      <td>${usuario.email}</td>
    </tr>
  `
})