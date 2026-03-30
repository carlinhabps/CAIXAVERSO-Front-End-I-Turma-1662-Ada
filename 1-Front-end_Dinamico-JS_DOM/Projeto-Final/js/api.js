// ! fetch das chamadas

async function findClients() {
  const resposta = await fetch("http://localhost:3000/clients");

  return resposta.json();
}

async function findAccounts() {
  const resposta = await fetch("http://localhost:3000/accounts");

  return resposta.json();
}

async function findTransactions() {
  const resposta = await fetch("http://localhost:3000/transactions");

  return resposta.json();
}
