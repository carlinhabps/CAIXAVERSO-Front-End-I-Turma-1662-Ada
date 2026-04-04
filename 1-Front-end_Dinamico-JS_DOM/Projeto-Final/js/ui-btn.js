// ! renderização - BOTÕES

// ! ============================== FUNÇÕES BASE ============================== ! //

function transitionsGroup(showContentTransition, hiddenContentTransition) {
  showContentTransition.forEach((e) => {
    hidden(e, "add", "showContentTransition");
  });

  hiddenContentTransition.forEach((e) => {
    hidden(e, "add", "hiddenContentTransition");
  });

  setTimeout(() => {
    showContentTransition.forEach((e) => {
      hidden(e, "remove", "showContentTransition");
      hidden(e, "remove", "hiddenContent");
    });

    hiddenContentTransition.forEach((e) => {
      hidden(e, "remove", "hiddenContentTransition");
      hidden(e, "add", "hiddenContent");
    });
  }, 500);
}

function hidden(x, y, z) {
  const elementFunction = x;
  const actionFunction = y;
  const classFunction = z;

  if (actionFunction === "add") {
    elementFunction.classList.add(classFunction);
  } else {
    elementFunction.classList.remove(classFunction);
  }
}

function openSomeGroup(element) {
  element.classList.add("showContentTransition");

  setTimeout(() => {
    element.classList.remove("showContentTransition");

    element.classList.remove("hiddenContent");
  }, 400);
}

function closeSomeGroup(element) {
  element.classList.add("hiddenContentTransition");

  setTimeout(() => {
    element.classList.remove("hiddenContentTransition");

    element.classList.add("hiddenContent");
  }, 400);
}

// ! ============================== HOME PAGE ============================== ! //

function logo() {
  const showContentTransition = [navBarContainer, homeLogo, containerWelcome];
  const hiddenContentTransition = [
    nav,
    containerClients,
    containerAccounts,
    containerTransactions,
  ];
  transitionsGroup(showContentTransition, hiddenContentTransition);
  navBarContainer.classList.add("hiddenNavBar");
}

homeLogo.addEventListener("click", (event) => logo());

// ! ============================== CLIENTES ============================== ! //

// ! ========== FUNÇÕES CLIENTES ========== ! //

function gestaoClientes() {
  const showContentTransition = [navBarContainer, nav, containerClients];
  const hiddenContentTransition = [
    errorMensageClient,
    containerWelcome,
    containerAccounts,
    containerTransactions,
    newClientForm,
  ];
  transitionsGroup(showContentTransition, hiddenContentTransition);
  navBarContainer.classList.remove("hiddenNavBar");
}

function openFormsClient() {
  const showContentTransition = [newClientForm];
  const hiddenContentTransition = [containerAccounts, containerTransactions];
  transitionsGroup(showContentTransition, hiddenContentTransition);
}

// ! ========== BOTÕES CLIENTES ========== ! //

btnClients.addEventListener("click", (event) => {
  gestaoClientes();
  carregarInfo();
});

navClients.addEventListener("click", (event) => {
  gestaoClientes();
  carregarInfo();
});

btnRegisterNewClient.addEventListener("click", (event) => {
  closeSomeGroup(containerAccounts);
  closeSomeGroup(deleteClientDiv);
  openFormsClient();

  newClientForm.setAttribute("data-action", "salvar");
  newClientForm.reset();
});

btnCancelClient.addEventListener("click", (event) => {
  newClientForm.reset();
  closeSomeGroup(newClientForm);
});

btnConsultClient.addEventListener("click", async (event) => {
  try {
    if (!window.idClienteSelecionado) return;

    closeSomeGroup(newClientForm);
    closeSomeGroup(deleteClientDiv);
    closeSomeGroup(containerTransactions);
    openAccountGroup();

    const accounts = await findObjectKeyValue(
      "accounts",
      "idCliente",
      window.idClienteSelecionado,
    );

    renderizarAccounts(accounts);
  } catch (error) {
    console.log(error);
  }
});

btnEditClient.addEventListener("click", async (event) => {
  try {
    if (!window.idClienteSelecionado) return;
    closeSomeGroup(containerAccounts);
    closeSomeGroup(deleteClientDiv);
    openFormsClient();

    const client = await findObjectId("clients", window.idClienteSelecionado);

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
  } catch (error) {
    console.log(error);
  }
});

btnDeleteClient.addEventListener("click", (event) => {
  if (!window.idClienteSelecionado) return;
  closeSomeGroup(newClientForm);
  closeSomeGroup(containerAccounts);
  openSomeGroup(deleteClientDiv);
});

deleteClientBtnSim.addEventListener("click", async (event) => {
  try {
    await deleteRegister("clients", window.idClienteSelecionado);
    carregarInfo();
    gestaoClientes();
    closeSomeGroup(deleteClientDiv);
  } catch (error) {
    console.log(error);
  }
});

deleteClientBtnNao.addEventListener("click", async (event) => {
  closeSomeGroup(deleteClientDiv);
});

// ! ============================== CONTAS ============================== ! //

// ! ========== FUNÇÕES CONTAS ========== ! //

function gestaoContas() {
  const showContentTransition = [navBarContainer, nav, containerAccounts];
  const hiddenContentTransition = [
    errorMensageAccount,
    containerWelcome,
    containerClients,
    containerTransactions,
    newAccountForm,
  ];
  transitionsGroup(showContentTransition, hiddenContentTransition);
  navBarContainer.classList.remove("hiddenNavBar");
}

function openAccountGroup() {
  const showContentTransition = [containerAccounts];
  const hiddenContentTransition = [newAccountForm, errorMensageAccount];
  transitionsGroup(showContentTransition, hiddenContentTransition);
}

async function openFormsAccount() {
  try {
    openSomeGroup(newAccountForm);
    await nameAllClients();
  } catch (error) {
    console.log(error);
  }
}

// ! ========== BOTÕES CONTAS ========== ! //

btnAccounts.addEventListener("click", async (event) => {
  try {
    gestaoContas();
    const accounts = await findObject("accounts");
    setTimeout(() => {
      renderizarAccounts(accounts);
    }, 500);
  } catch (error) {
    console.log(error);
  }
});

navAccounts.addEventListener("click", async (event) => {
  try {
    gestaoContas();
    const accounts = await findObject("accounts");
    setTimeout(() => {
      renderizarAccounts(accounts);
    }, 500);
  } catch (error) {
    console.log(error);
  }
});

btnRegisterNewAccount.addEventListener("click", async (event) => {
  closeSomeGroup(containerTransactions);
  closeSomeGroup(deleteClientDiv);
  await openFormsAccount();

  newAccountForm.setAttribute("data-action", "salvar");

  if (!window.idClienteSelecionado) return;
  setTimeout(() => {
    selectAccountClient.value = window.idClienteSelecionado;
    console.log("valor após delay", selectAccountClient.value);
  }, 50);
});

btnCancelAccount.addEventListener("click", (event) => {
  newAccountForm.reset();
  closeSomeGroup(newAccountForm);
});

btnConsultAccount.addEventListener("click", async (event) => {
  try {
    if (!window.idContaSelecionada) return;
    closeSomeGroup(newAccountForm);
    closeSomeGroup(deleteAccountDiv);
    openTransactionsGroup();

    const transactions = await findObjectKeyValue(
      "transactions",
      "idConta",
      window.idContaSelecionada,
    );

    renderizarTransactions(transactions);
  } catch (error) {
    console.log(error);
  }
});

btnEditAccount.addEventListener("click", async (event) => {
  try {
    if (!window.idContaSelecionada) return;
    closeSomeGroup(containerTransactions);
    openSomeGroup(deleteAccountDiv);
    deleteAccountP.innerText = "Confirma o encerramento da conta selecionada?";
    deleteAccountBtnSim.setAttribute("data-action", "encerrar");
  } catch (error) {
    console.log(error);
  }
});

btnDeleteAccount.addEventListener("click", async (event) => {
  try {
    if (!window.idContaSelecionada) return;
    closeSomeGroup(containerTransactions);
    openSomeGroup(deleteAccountDiv);
    deleteAccountP.innerText = "Deseja realmente excluir a conta do cadastro?";
    deleteAccountBtnSim.setAttribute("data-action", "deletar");
  } catch (error) {
    console.log(error);
  }
});

// ! BOTÃO DE EDIÇÃO DA CONTA COM PROBLEMAS
deleteAccountBtnSim.addEventListener("click", async (event) => {
  try {
    const conta = await findObjectId("accounts", window.idContaSelecionada);

    const id = window.idContaSelecionada;
    const idCliente = conta.idCliente;
    const numeroConta = conta.numeroConta;
    const tipoConta = conta.tipoConta;
    const saldo = conta.saldo;
    const status = "encerrada";

    const action = event.target.dataset.action;

    if (action === "encerrar") {
      await editRegister("accounts", {
        id,
        idCliente,
        numeroConta,
        tipoConta,
        saldo,
        status,
      });
    } else if (action === "deletar") {
      await deleteRegister("accounts", window.idContaSelecionada);
    }
    const accounts = await findObject("accounts");
    renderizarAccounts(accounts);
    closeSomeGroup(deleteClientDiv);
  } catch (error) {
    console.log(error);
  }
});

deleteAccountBtnNao.addEventListener("click", async (event) => {
  closeSomeGroup(deleteClientDiv);
});

// ! ============================== TRANSAÇÕES ============================== ! //

// ! ========== FUNÇÕES TRANSAÇÕES ========== ! //

function gestaoTransacoes() {
  const showContentTransition = [
    navBarContainer,
    nav,
    containerTransactions,
    selectClientName,
  ];
  const hiddenContentTransition = [
    containerWelcome,
    containerClients,
    containerAccounts,
    newTransactionForm,
    errorMensageTransaction,
  ];
  transitionsGroup(showContentTransition, hiddenContentTransition);
  navBarContainer.classList.remove("hiddenNavBar");
}

function openTransactionsGroup() {
  const showContentTransition = [containerTransactions];
  const hiddenContentTransition = [
    newTransactionForm,
    errorMensageTransaction,
    selectClientName,
  ];
  transitionsGroup(showContentTransition, hiddenContentTransition);
  selectClientAccount.disabled = false;
}

// ! ========== BOTÕES TRANSAÇÕES ========== ! //

btnTransactions.addEventListener("click", async (event) => {
  try {
    gestaoTransacoes();

    const transactions = await findObject("transactions");
    setTimeout(() => {
      renderizarTransactions(transactions);
    }, 500);
  } catch (error) {
    console.log(error);
  }
});

navTransactions.addEventListener("click", async (event) => {
  try {
    gestaoTransacoes();

    const transactions = await findObject("transactions");
    setTimeout(() => {
      renderizarTransactions(transactions);
    }, 500);
  } catch (error) {
    console.log(error);
  }
});
