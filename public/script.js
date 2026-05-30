const butaoCadatro = document.getElementById('butaoCadatro')
const butaoAtualizar = document.getElementById('butaoAtualizar')
const butaoAtualizarEmail = document.getElementById('butaoAtualizarEmail')

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