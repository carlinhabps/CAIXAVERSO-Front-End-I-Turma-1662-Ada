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

async function consultContasCliente() {
  try {
    if (!window.idClienteSelecionado) return;

    closeSomeGroup(newClientForm);

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
  consultContasCliente();
  closeSomeGroup(deleteClientDiv);
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

btnDeleteClient.addEventListener("click", async (event) => {
  if (!window.idClienteSelecionado) return;
  if (!(await validaExclusaoCliente(window.idClienteSelecionado))) return;

  const contasCliente = await findObjectKeyValue(
    "accounts",
    "idCliente",
    window.idClienteSelecionado,
  );
  const contasEncerradas = contasCliente.filter(
    (acc) => acc.status.toLowerCase() === "encerrada",
  );

  if (
    contasCliente.length === contasEncerradas.length &&
    contasEncerradas.length > 0
  ) {
    deleteClientP.innerHTML = `O cliente possui <span>${contasEncerradas.length} conta(s) encerradas</span>. Confirma a <span>exclusão</span> do cadastro do cliente e conta(s) da base?`;
  } else {
    deleteClientP.innerHTML = `Confirma a <span>exclusão</span> do cadastro do(a) cliente?`;
  }

  deleteClientBtnSim.classList.remove("hiddenContent");

  closeSomeGroup(newClientForm);
  closeSomeGroup(containerAccounts);
  openSomeGroup(deleteClientDiv);
});

deleteClientBtnSim.addEventListener("click", async (event) => {
  try {
    const contasCliente = await findObjectKeyValue(
      "accounts",
      "idCliente",
      window.idClienteSelecionado,
    );

    const contasEncerradas = contasCliente.filter(
      (acc) => acc.status.toLowerCase() === "encerrada",
    );
    const idContasEncerradas = contasEncerradas.map((acc) => acc.id);

    const transactions = await findObjectKeyValue(
      "transactions",
      "idCliente",
      window.idClienteSelecionado,
    );

    if (contasEncerradas.length > 0) {
      for (const t of transactions) {
        await deleteRegister("transactions", t.id);
      }

      for (const id of idContasEncerradas) {
        await deleteRegister("accounts", id);
      }
    }

    const newContasCliente = await findObjectKeyValue(
      "accounts",
      "idCliente",
      window.idClienteSelecionado,
    );

    if (newContasCliente.length > 0) {
      return;
    } else {
      await deleteRegister("clients", window.idClienteSelecionado);
    }

    await carregarInfo();
    gestaoClientes();
    closeSomeGroup(deleteClientDiv);
  } catch (error) {
    console.log(error);
  }
});

deleteClientBtnNao.addEventListener("click", (event) => {
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
    selectClientAccount.classList.add("hiddenContent");

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

    const conta = await findObjectId("accounts", window.idContaSelecionada);
    const status = conta.status.toLowerCase();
    const saldo = Number(conta.saldo);

    closeSomeGroup(containerTransactions);
    openSomeGroup(deleteAccountDiv);

    if (status == "ativa") {
      if (!validaSaldoConta(saldo)) return;
      deleteAccountP.innerHTML =
        "Confirma o <span>encerramento</span> da conta selecionada?";
      deleteAccountBtnSim.setAttribute("data-action", "encerrar");
      deleteAccountBtnSim.classList.remove("hiddenContent");
    } else if (status == "encerrada") {
      deleteAccountP.innerHTML =
        "Deseja <span>reativar</span> a conta selecionada?";
      deleteAccountBtnSim.setAttribute("data-action", "ativar");
      deleteAccountBtnSim.classList.remove("hiddenContent");
    }
  } catch (error) {
    console.log(error);
  }
});

btnDeleteAccount.addEventListener("click", async (event) => {
  try {
    if (!window.idContaSelecionada) return;
    const conta = await findObjectId("accounts", window.idContaSelecionada);
    const status = conta.status.toLowerCase();

    if (!validaStatusConta(status)) return;

    closeSomeGroup(containerTransactions);
    openSomeGroup(deleteAccountDiv);
    deleteAccountBtnSim.classList.remove("hiddenContent");

    deleteAccountP.innerHTML =
      "Deseja realmente <span>excluir</span> a conta do cadastro?";
    deleteAccountBtnSim.setAttribute("data-action", "deletar");
  } catch (error) {
    console.log(error);
  }
});

deleteAccountBtnSim.addEventListener("click", async (event) => {
  try {
    const conta = await findObjectId("accounts", window.idContaSelecionada);

    const id = window.idContaSelecionada;
    const idCliente = conta.idCliente;
    const numeroConta = conta.numeroConta;
    const tipoConta = conta.tipoConta;
    const saldo = conta.saldo;

    const action = event.target.dataset.action;

    if (action === "ativar") {
      const status = "Ativa";
      await editRegister("accounts", {
        id,
        idCliente,
        numeroConta,
        tipoConta,
        saldo,
        status,
      });
    } else if (action === "encerrar") {
      const status = "encerrada";
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

    if (window.idClienteSelecionado == null) {
      const accounts = await findObject("accounts");
      renderizarAccounts(accounts);
    } else {
      const contasCliente = await findObjectKeyValue(
        "accounts",
        "idCliente",
        window.idClienteSelecionado,
      );
      await renderizarAccounts(contasCliente);
    }

    closeSomeGroup(deleteAccountDiv);
  } catch (error) {
    console.log(error);
  }
});

deleteAccountBtnNao.addEventListener("click", async (event) => {
  closeSomeGroup(deleteAccountDiv);
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
    mensageTransaction,
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

function openFormsTransaction() {
  try {
    openSomeGroup(newTransactionForm);
  } catch (error) {
    console.log(error);
  }
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

btnDeposito.addEventListener("click", async (event) => {
  openFormsTransaction();
  inputTransactionValor.placeholder = "Informe o valor a ser depositado";
  mensageTransaction.innerText = "";
  btnSaveTransaction.innerText = "DEPOSITAR";
  newTransactionForm.setAttribute("data-action", "deposito");
});

btnSaque.addEventListener("click", async (event) => {
  openFormsTransaction();
  inputTransactionValor.placeholder = "Informe o valor a ser sacado";
  mensageTransaction.innerText = "";
  btnSaveTransaction.innerText = "SACAR";
  newTransactionForm.setAttribute("data-action", "saque");
});

btnCancelTransaction.addEventListener("click", async (event) => {
  mensageTransaction.innerHTML = `Transação cancelada pelo usuário. <br> o valor não será contabilizado na conta!`;
  mensageTransaction.classList.remove("errorMensageTransaction");
  mensageTransaction.classList.remove("okMensageTransaction");
  mensageTransaction.classList.remove("hiddenContent");
  setTimeout(() => {
    closeSomeGroup(newTransactionForm);
  }, 4000);
});
