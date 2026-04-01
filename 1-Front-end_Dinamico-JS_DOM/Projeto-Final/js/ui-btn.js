// ! renderização - BOTÕES

// btnClients.addEventListener("click", (event) => {
//   // inclui classes de transição
//   setTimeout(() => {
//     // exclui classes de transição
//     // inclui/exclui classe com display none
//   }, 500);
// });

function logo() {
  navBarContainer.classList.add("hiddenContentTransition");
  nav.classList.add("hiddenContentTransition");
  containerWelcome.classList.add("hiddenContentTransition");
  containerClients.classList.add("hiddenContentTransition");
  containerAccounts.classList.add("hiddenContentTransition");
  containerTransactions.classList.add("hiddenContentTransition");
  navClients.classList.add("showContentTransition");
  navAccounts.classList.add("showContentTransition");
  navTransactions.classList.add("showContentTransition");

  setTimeout(() => {
    navBarContainer.classList.remove("hiddenContentTransition");
    nav.classList.remove("hiddenContentTransition");
    containerWelcome.classList.remove("hiddenContentTransition");
    containerClients.classList.remove("hiddenContentTransition");
    containerAccounts.classList.remove("hiddenContentTransition");
    containerTransactions.classList.remove("hiddenContentTransition");
    navClients.classList.remove("showContentTransition");
    navAccounts.classList.remove("showContentTransition");
    navTransactions.classList.remove("showContentTransition");

    navBarContainer.classList.add("hiddenNavBar");
    nav.classList.add("hiddenContent");
    containerWelcome.classList.remove("hiddenContent");
    containerClients.classList.add("hiddenContent");
    containerAccounts.classList.add("hiddenContent");
    containerTransactions.classList.add("hiddenContent");
    navClients.classList.remove("hiddenContent");
    navAccounts.classList.remove("hiddenContent");
    navTransactions.classList.remove("hiddenContent");
  }, 500);
}
homeLogo.addEventListener("click", (event) => logo());

// ! CLIENTES

// ! FUNÇÕES CLIENTES

function gestaoClientes() {
  navBarContainer.classList.add("showContentTransition");
  nav.classList.add("showContentTransition");
  containerWelcome.classList.add("hiddenContentTransition");
  containerClients.classList.add("showContentTransition");
  newClientForm.classList.add("hiddenContentTransition");

  errorMensageClient.classList.add("hiddenContent");

  setTimeout(() => {
    navBarContainer.classList.remove("showContentTransition");
    nav.classList.remove("showContentTransition");
    containerWelcome.classList.remove("hiddenContentTransition");
    containerClients.classList.remove("showContentTransition");
    newClientForm.classList.remove("hiddenContentTransition");

    navBarContainer.classList.remove("hiddenNavBar");
    nav.classList.remove("hiddenContent");
    containerWelcome.classList.add("hiddenContent");
    containerClients.classList.remove("hiddenContent");
    newClientForm.classList.add("hiddenContent");
  }, 500);
}

function gestaoClientesNav() {
  navAccounts.classList.add("showContentTransition");
  navTransactions.classList.add("showContentTransition");
  containerClients.classList.add("showContentTransition");
  containerAccounts.classList.add("hiddenContentTransition");
  containerTransactions.classList.add("hiddenContentTransition");
  newClientForm.classList.add("hiddenContentTransition");

  errorMensageClient.classList.add("hiddenContent");

  setTimeout(() => {
    navAccounts.classList.remove("showContentTransition");
    navTransactions.classList.remove("showContentTransition");
    containerClients.classList.remove("showContentTransition");
    containerAccounts.classList.remove("hiddenContentTransition");
    containerTransactions.classList.remove("hiddenContentTransition");
    newClientForm.classList.remove("hiddenContentTransition");

    navAccounts.classList.remove("hiddenContent");
    navTransactions.classList.remove("hiddenContent");
    containerClients.classList.remove("hiddenContent");
    containerAccounts.classList.add("hiddenContent");
    containerTransactions.classList.add("hiddenContent");
    newClientForm.classList.add("hiddenContent");
  }, 500);
}

function openFormsClient() {
  newClientForm.classList.add("showContentTransition");

  setTimeout(() => {
    newClientForm.classList.remove("showContentTransition");

    newClientForm.classList.remove("hiddenContent");
  }, 400);
}

function closeFormsClient() {
  newClientForm.classList.add("hiddenContentTransition");

  setTimeout(() => {
    newClientForm.classList.remove("hiddenContentTransition");

    newClientForm.classList.add("hiddenContent");
  }, 400);
}

function openConfirmDeleteClient() {
  deleteClientDiv.classList.add("showContentTransition");

  setTimeout(() => {
    deleteClientDiv.classList.remove("showContentTransition");

    deleteClientDiv.classList.remove("hiddenContent");
  }, 400);
}

function closeConfirmDeleteClient() {
  deleteClientDiv.classList.add("hiddenContentTransition");

  setTimeout(() => {
    deleteClientDiv.classList.remove("hiddenContentTransition");

    deleteClientDiv.classList.add("hiddenContent");
  }, 400);
}

// ! BOTÕES CLIENTES

btnClients.addEventListener("click", (event) => gestaoClientes());

navClients.addEventListener("click", (event) => gestaoClientesNav());

btnRegisterNewClient.addEventListener("click", (event) => {
  closeAccountGroup();
  openFormsClient();
  newClientForm.setAttribute("data-action", "salvar");
});

btnConsultClient.addEventListener("click", async (event) => {
  try {
    if (!window.idClienteSelecionado) return;
    closeFormsClient();
    openAccountGroup();

    const accounts = await findAccountsIdCliente(window.idClienteSelecionado);

    renderizarAccounts(accounts);
  } catch (error) {
    console.log(error);
  }
});

btnEditClient.addEventListener("click", async (event) => {
  try {
    if (!window.idClienteSelecionado) return;
    openFormsClient();

    const client = await findClientsId(window.idClienteSelecionado);

    let cpf = String(client.cpf);
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.slice(0, 11);
    if (cpf.length > 9) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    if (cpf.length > 6) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d)/, "$1.$2.$3");
    }
    if (cpf.length > 3) {
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    }

    inputClientId.value = client.id;
    inputClientName.value = client.nome.toUpperCase();
    inputClientCpf.value = cpf;
    inputClientEmail.value = client.email.toLowerCase();

    newClientForm.setAttribute("data-action", "editar");

    closeAccountGroup();
  } catch (error) {}
});

btnCancelNewClient.addEventListener("click", (event) => {
  newClientForm.reset();
  newClientForm.classList.add("hiddenContentTransition");

  setTimeout(() => {
    newClientForm.classList.remove("hiddenContentTransition");

    newClientForm.classList.add("hiddenContent");
  }, 500);
});

btnDeleteClient.addEventListener("click", (event) => {
  if (!window.idClienteSelecionado) return;
  closeAccountGroup();
  openConfirmDeleteClient();
});

deleteClientBtnSim.addEventListener("click", async (event) => {
  try {
    await deleteClient(window.idClienteSelecionado);
    carregarInfo();
    gestaoClientes();
    closeConfirmDeleteClient();
  } catch (error) {
    console.log(error);
  }
});

deleteClientBtnNao.addEventListener("click", async (event) => {
  closeConfirmDeleteClient();
});

// ! CONTAS

// ! FUNÇÕES CONTAS

function gestaoContas() {
  navBarContainer.classList.add("showContentTransition");
  nav.classList.add("showContentTransition");
  containerWelcome.classList.add("hiddenContentTransition");
  containerAccounts.classList.add("showContentTransition");
  newAccountForm.classList.add("hiddenContentTransition");

  errorMensageAccount.classList.add("hiddenContent");

  setTimeout(() => {
    navBarContainer.classList.remove("showContentTransition");
    nav.classList.remove("showContentTransition");
    containerWelcome.classList.remove("hiddenContentTransition");
    containerAccounts.classList.remove("showContentTransition");
    newAccountForm.classList.remove("hiddenContentTransition");

    navBarContainer.classList.remove("hiddenNavBar");
    nav.classList.remove("hiddenContent");
    containerWelcome.classList.add("hiddenContent");
    containerAccounts.classList.remove("hiddenContent");
    newAccountForm.classList.add("hiddenContent");
  }, 500);
}

function gestaoContasNav() {
  navClients.classList.add("showContentTransition");
  navTransactions.classList.add("showContentTransition");
  containerClients.classList.add("hiddenContentTransition");
  containerAccounts.classList.add("showContentTransition");
  containerTransactions.classList.add("hiddenContentTransition");
  newAccountForm.classList.add("hiddenContentTransition");

  errorMensageAccount.classList.add("hiddenContent");

  setTimeout(() => {
    navClients.classList.remove("showContentTransition");
    navTransactions.classList.remove("showContentTransition");
    containerClients.classList.remove("hiddenContentTransition");
    containerAccounts.classList.remove("showContentTransition");
    containerTransactions.classList.remove("hiddenContentTransition");
    newAccountForm.classList.remove("hiddenContentTransition");

    navClients.classList.remove("hiddenContent");
    navTransactions.classList.remove("hiddenContent");
    containerClients.classList.add("hiddenContent");
    containerAccounts.classList.remove("hiddenContent");
    containerTransactions.classList.add("hiddenContent");
    newAccountForm.classList.add("hiddenContent");
  }, 500);
}

function openAccountGroup() {
  containerAccounts.classList.add("showContentTransition");
  newAccountForm.classList.add("hiddenContentTransition");

  errorMensageAccount.classList.add("hiddenContent");

  setTimeout(() => {
    containerAccounts.classList.remove("showContentTransition");
    newAccountForm.classList.remove("hiddenContentTransition");

    containerAccounts.classList.remove("hiddenContent");
    newAccountForm.classList.add("hiddenContent");
  }, 500);
}
function closeAccountGroup() {
  containerAccounts.classList.add("hiddenContentTransition");

  setTimeout(() => {
    containerAccounts.classList.remove("hiddenContentTransition");

    containerAccounts.classList.add("hiddenContent");
  }, 500);
}

async function openFormsAccount() {
  newAccountForm.classList.add("showContentTransition");

  const contas = await findAccounts();
  dadosSelectAccountClient(contas);

  setTimeout(() => {
    newAccountForm.classList.remove("showContentTransition");

    newAccountForm.classList.remove("hiddenContent");
  }, 400);
}
function closeFormsAccount() {
  newAccountForm.classList.add("hiddenContentTransition");

  setTimeout(() => {
    newAccountForm.classList.remove("hiddenContentTransition");

    newAccountForm.classList.add("hiddenContent");
  }, 400);
}
// ! BOTÕES CONTAS

btnAccounts.addEventListener("click", (event) => gestaoContas());

navAccounts.addEventListener("click", (event) => gestaoContasNav());

btnRegisterNewAccount.addEventListener("click", (event) => {
  closeTransactionsGroup();
  openFormsAccount();
  newAccountForm.setAttribute("data-action", "salvar");
});

// ! TRANSAÇÕES

// ! FUNÇÕES TRANSAÇÕES

function gestaoTransacoes() {
  navBarContainer.classList.add("showContentTransition");
  nav.classList.add("showContentTransition");
  containerWelcome.classList.add("hiddenContentTransition");
  containerTransactions.classList.add("showContentTransition");
  clientName.classList.add("hiddenContentTransition");
  newTransactionForm.classList.add("hiddenContentTransition");

  errorMensageTransaction.classList.add("hiddenContent");

  setTimeout(() => {
    navBarContainer.classList.remove("showContentTransition");
    nav.classList.remove("showContentTransition");
    containerWelcome.classList.remove("hiddenContentTransition");
    containerTransactions.classList.remove("showContentTransition");
    clientName.classList.remove("hiddenContentTransition");
    newTransactionForm.classList.remove("hiddenContentTransition");

    navBarContainer.classList.remove("hiddenNavBar");
    nav.classList.remove("hiddenContent");
    containerWelcome.classList.add("hiddenContent");
    containerTransactions.classList.remove("hiddenContent");
    clientName.classList.add("hiddenContent");
    newTransactionForm.classList.add("hiddenContent");
  }, 500);
}

function gestaoTransacoesNav() {
  navClients.classList.add("showContentTransition");
  navAccounts.classList.add("showContentTransition");
  containerClients.classList.add("hiddenContentTransition");
  containerAccounts.classList.add("hiddenContentTransition");
  containerTransactions.classList.add("showContentTransition");
  clientName.classList.add("hiddenContentTransition");
  selectClientName.classList.add("showContentTransition");
  newTransactionForm.classList.add("hiddenContentTransition");

  errorMensageTransaction.classList.add("hiddenContent");

  setTimeout(() => {
    navClients.classList.remove("showContentTransition");
    navAccounts.classList.remove("showContentTransition");
    containerClients.classList.remove("hiddenContentTransition");
    containerAccounts.classList.remove("hiddenContentTransition");
    containerTransactions.classList.remove("showContentTransition");
    clientName.classList.remove("hiddenContentTransition");
    selectClientName.classList.remove("showContentTransition");
    newTransactionForm.classList.remove("hiddenContentTransition");

    navClients.classList.remove("hiddenContent");
    navAccounts.classList.remove("hiddenContent");
    containerClients.classList.add("hiddenContent");
    containerAccounts.classList.add("hiddenContent");
    containerTransactions.classList.remove("hiddenContent");
    clientName.classList.add("hiddenContent");
    selectClientName.classList.remove("hiddenContent");
    newTransactionForm.classList.add("hiddenContent");
  }, 500);
}

function openTransactionsGroup() {
  containerTransactions.classList.add("showContentTransition");
  newTransactionForm.classList.add("hiddenContentTransition");

  errorMensageTransaction.classList.add("hiddenContent");

  setTimeout(() => {
    containerTransactions.classList.remove("showContentTransition");
    newTransactionForm.classList.remove("hiddenContentTransition");

    containerTransactions.classList.remove("hiddenContent");
    newTransactionForm.classList.add("hiddenContent");
  }, 500);
}
function closeTransactionsGroup() {
  containerTransactions.classList.add("hiddenContentTransition");

  setTimeout(() => {
    containerTransactions.classList.remove("hiddenContentTransition");

    containerTransactions.classList.add("hiddenContent");
  }, 500);
}

// ! BOTÕES TRANSAÇÕES

btnTransactions.addEventListener("click", (event) => gestaoTransacoes());

navTransactions.addEventListener("click", (event) => gestaoTransacoesNav());
