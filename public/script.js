document.addEventListener('submit', async e => {
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
    alert('a')
    return
  }

  const response = await fetch('/usuarios', {
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
    alert('salvo com sucesso!!')
  } else {
    onerror('erro')
  }
})
