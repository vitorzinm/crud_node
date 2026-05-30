const butaoCadatro = document.getElementById('butaoCadatro')
const butaoAtualizar = document.getElementById('butaoAtualizar')
const butaoAtualizarEmail = document.getElementById('butaoAtualizarEmail')
const direcionadorNome = document.getElementById('direcionadorNome')
const direcionadorEmail = document.getElementById('direcionadorEmail')
const voltar = document.getElementById('voltar')
const voltar1 = document.getElementById('voltar1')

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
direcionadorEmail.addEventListener('click', function(){
  const atualizacoes = document.getElementById('atualizacoes')
  const atualizacoesBotao = document.getElementById('atualizacoesBotao')
  const atulizacaoemail = document.getElementById('atulizacaoemail')
  const atualizacaoNome = document.getElementById('atualizacaoNome')

  atualizacoes.style.display = 'flex'
  atualizacoesBotao.style.display = 'none'
  atulizacaoemail.style.display = 'flex'
  atualizacaoNome.style.display = 'none'
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
    alert('Email invalido')
    return
  }

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

  if (!emailRegex.test(emailNovo)) {
    alert('Email invalido')
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

  const divAtualizacoes = document.getElementById('atualizacoes')
  const divCasdastro = document.getElementById('cadastro')
 
  const nome = document.getElementById('nome').value
  const email = document.getElementById('email').value

  if (nome.length >= 300) {
    alert('Isso n é nome')
    return
  }

  if (email.length >= 200) {
    alert('Email invalido')
    return
  }

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

  if (!emailRegex.test(email)) {
    alert('Email invalido')
    return
  }

  if (nome == '') {
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
    alert('Salvo com sucesso!!')
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