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

btnClients.addEventListener("click", (event) => gestaoClientes());

navClients.addEventListener("click", (event) => gestaoClientes());

btnRegisterNewClient.addEventListener("click", (event) => {
  closeSomeGroup(containerAccounts);
  closeSomeGroup(deleteClientDiv);
  openFormsClient();
  newClientForm.setAttribute("data-action", "salvar");
  newClientForm.reset();
});

btnConsultClient.addEventListener("click", async (event) => {
  try {
    if (!window.idClienteSelecionado) return;
    closeSomeGroup(newClientForm);
    closeSomeGroup(deleteClientDiv);
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

    closeSomeGroup(containerAccounts);
  } catch (error) {}
});

btnCancelClient.addEventListener("click", (event) => {
  newClientForm.reset();
  newClientForm.classList.add("hiddenContentTransition");

  setTimeout(() => {
    newClientForm.classList.remove("hiddenContentTransition");

    newClientForm.classList.add("hiddenContent");
  }, 500);
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

btnRegisterNewAccount.addEventListener("click", (event) => {
  closeSomeGroup(containerTransactions);
  closeSomeGroup(deleteClientDiv);

  openFormsAccount();
  newAccountForm.setAttribute("data-action", "salvar");
});

btnRegisterNewClient.addEventListener("click", (event) => {
  closeSomeGroup(containerAccounts);
  closeSomeGroup(btnEditAccount);
  openFormsClient();
  newAccountForm.setAttribute("data-action", "salvar");
  newAccountForm.reset();
});

// ! ============================== TRANSAÇÕES ============================== ! //

// ! ========== FUNÇÕES TRANSAÇÕES ========== ! //

function gestaoTransacoes() {
  const showContentTransition = [navBarContainer, nav, containerTransactions];
  const hiddenContentTransition = [
    errorMensageTransaction,
    containerWelcome,
    newTransactionForm,
    clientName,
  ];
  transitionsGroup(showContentTransition, hiddenContentTransition);
  navBarContainer.classList.remove("hiddenNavBar");
}

function gestaoTransacoesNav() {
  const showContentTransition = [
    navClients,
    navAccounts,
    containerTransactions,
    selectClientName,
  ];
  const hiddenContentTransition = [
    containerClients,
    containerAccounts,
    clientName,
    newTransactionForm,
    errorMensageTransaction,
  ];
  transitionsGroup(showContentTransition, hiddenContentTransition);
}

function openTransactionsGroup() {
  const showContentTransition = [containerTransactions];
  const hiddenContentTransition = [newTransactionForm, errorMensageTransaction];
  transitionsGroup(showContentTransition, hiddenContentTransition);
}

// ! ========== BOTÕES TRANSAÇÕES ========== ! //

btnTransactions.addEventListener("click", (event) => gestaoTransacoes());

navTransactions.addEventListener("click", (event) => gestaoTransacoesNav());
