// ! fetch das chamadas

const banco = "http://localhost:3000/";

// ! buscar em CLIENTS

async function findClients() {
  const resposta = await fetch("http://localhost:3000/clients");

  return await resposta.json();
}

async function findClientsId(id) {
  const resposta = await fetch(`http://localhost:3000/clients/${id}`);

  return await resposta.json();
}

async function dataNewClient(client) {
  const resposta = await fetch("http://localhost:3000/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });
  return await resposta.json();
}

async function editClient(editedClient) {
  const resposta = await fetch(
    `http://localhost:3000/clients/${editedClient.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedClient),
    },
  );
  return await resposta.json();
}

async function deleteClient(id) {
  const resposta = await fetch(`http://localhost:3000/clients/${id}`, {
    method: "DELETE",
  });
  return await resposta.json();
}

// ! buscar em ACCOUNT

async function findAccounts() {
  const resposta = await fetch("http://localhost:3000/accounts");

  return await resposta.json();
}

async function findAccountsIdConta(id) {
  const resposta = await fetch(`http://localhost:3000/accounts/${id}`);

  return await resposta.json();
}

async function findAccountsIdCliente(idCliente) {
  const resposta = await fetch(
    `http://localhost:3000/accounts?idCliente=${idCliente}`,
  );

  return await resposta.json();
}

async function dataNewAccount(account) {
  const resposta = await fetch("http://localhost:3000/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });
  return await resposta.json();
}

async function editAccount(editedAccount) {
  const resposta = await fetch(
    `http://localhost:3000/accounts/${editedAccount.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedAccount),
    },
  );
  return await resposta.json();
}

// ! buscar em TRANSACTIONS

async function findTransactions() {
  const resposta = await fetch("http://localhost:3000/transactions");

  return await resposta.json();
}
