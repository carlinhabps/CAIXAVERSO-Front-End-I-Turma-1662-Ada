// ! fetch das chamadas

// ! buscar objeto

async function findClients() {
  const resposta = await fetch("http://localhost:3001/clients");

  return resposta.json();
}

async function findAccounts() {
  const resposta = await fetch("http://localhost:3001/accounts");

  return resposta.json();
}

async function findTransactions() {
  const resposta = await fetch("http://localhost:3001/transactions");

  return resposta.json();
}

// ! identificar o objeto pelo id

async function findClientsId(id) {
  const resposta = await fetch(`http://localhost:3001/clients/${id}`);

  return resposta.json();
}

async function findAccountsIdConta(id) {
  const resposta = await fetch(`http://localhost:3001/accounts/${id}`);

  return resposta.json();
}

async function findAccountsIdCliente(idCliente) {
  const resposta = await fetch(`http://localhost:3001/accounts/${idCliente}`);

  return resposta.json();
}
