// ! fetch das chamadas

// ! buscar objeto

async function findClients() {
  const resposta = await fetch("http://localhost:3001/clients");

  return await resposta.json();
}

async function findAccounts() {
  const resposta = await fetch("http://localhost:3001/accounts");

  return await resposta.json();
}

async function findTransactions() {
  const resposta = await fetch("http://localhost:3001/transactions");

  return await resposta.json();
}

// ! identificar o objeto pelo id

async function findClientsId(id) {
  const resposta = await fetch(`http://localhost:3001/clients/${id}`);

  return await resposta.json();
}

async function findAccountsIdConta(id) {
  const resposta = await fetch(`http://localhost:3001/accounts/${id}`);

  return await resposta.json();
}

async function findAccountsIdCliente(idCliente) {
  const resposta = await fetch(
    `http://localhost:3001/accounts?idCliente=${idCliente}`,
  );

  return await resposta.json();
}

// ! Cadastros

async function dataNewClient(client) {
  const resposta = await fetch("http://localhost:3001/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });
  return await resposta.json();
}
