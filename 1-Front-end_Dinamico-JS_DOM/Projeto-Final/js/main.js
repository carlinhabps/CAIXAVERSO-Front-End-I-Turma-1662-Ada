// ! lógica principal

carregarInfo();

// ! ============================== FORMULÁRIOS | CRIAÇÃO ============================== ! //

// ! ========== CLIENTES ========== ! //

newClientForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const id = inputClientId.value;
    const nome = inputClientName.value.toLowerCase();
    const cpf = Number(inputClientCpf.value.replace(/\D/g, ""));
    const email = inputClientEmail.value.toLowerCase();

    if (!(await validacaoCliente(nome, cpf, email))) return;

    const action = event.target.dataset.action;

    if (action === "salvar") {
      await newRegister("clients", { nome, cpf, email });
    } else if (action === "editar") {
      await editRegister("clients", { id, nome, cpf, email });
    }

    newClientForm.reset();
    carregarInfo();
    gestaoClientes();

    btnConsultClient.classList.remove("hiddenContent");
    btnEditClient.classList.remove("hiddenContent");
    btnDeleteClient.classList.remove("hiddenContent");
  } catch (error) {
    console.log(error);
  }
});

// ! ========== CONTAS ========== ! //

newAccountForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    // const id = inputAccountId.value;
    const idCliente = selectAccountClient.value;
    const tipoConta = selectAccountType.value;
    const saldo = 0;
    const status = "Ativa";

    const arrAccountsClients = await findObjectKeyValue(
      "accounts",
      "idCliente",
      idCliente,
    );
    if (arrAccountsClients.length === 0) {
      numeroConta = 1001;
    } else {
      const arrNumAccounts = arrAccountsClients.map((acc) => acc.numeroConta);
      const maxAccount = Math.max(...arrNumAccounts);
      numeroConta = maxAccount + 1;
    }

    if (!validacaoConta(idCliente, tipoConta)) return;

    const action = event.target.dataset.action;

    if (action === "salvar") {
      await newRegister("accounts", {
        idCliente,
        numeroConta,
        tipoConta,
        saldo,
        status,
      });
    } else if (action === "editar") {
      await editRegister("accounts", {
        id,
        idCliente,
        numeroConta,
        tipoConta,
        saldo,
        status,
      });
    }

    newAccountForm.reset();
    closeSomeGroup(newAccountForm);

    const updatedAccountsClient = await findObjectKeyValue(
      "accounts",
      "idCliente",
      idCliente,
    );

    if (window.idClienteSelecionado == null) {
      carregarInfo();
    } else {
      renderizarAccounts(updatedAccountsClient);
    }

    btnConsultAccount.classList.remove("hiddenContent");
    btnEditAccount.classList.remove("hiddenContent");
    btnDeleteAccount.classList.remove("hiddenContent");
  } catch (error) {
    console.log(error);
  }

  console.log(event);
});

// ! ========== TRANSAÇÕES ========== ! //

// selectTransactionNameAndAccount.addEventListener("submit", (event) => {
//   event.preventDefault();

// });

// ! ==================== FORMULÁRIOS | MANIPULAÇÃO ==================== ! //

inputClientName.addEventListener("input", (event) => {
  event.target.value = event.target.value.toUpperCase();
});

inputClientCpf.addEventListener("input", (event) => {
  console.log(event);
  let cpf = String(event.target.value);

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
  event.target.value = cpf;
});

inputClientEmail.addEventListener("input", (event) => {
  event.target.value = event.target.value.toLowerCase();
});

async function nameAllClients() {
  selectAccountClient.length = 1;

  const clients = await findObject("clients");

  clients.sort((a, b) => a.nome.localeCompare(b.nome));

  clients.forEach(({ nome, id }) => {
    const nomeFormatado = nome.toUpperCase();

    const option = newTag("option");
    option.value = id;
    option.innerText = nomeFormatado;

    selectAccountClient.appendChild(option);
  });
}

// ! ========== TRANSAÇÕES ========== ! //

async function nameClientsWithAccounts() {
  try {
    selectClientName.length = 2;
    selectTransactionClient.length = 1;

    const contas = await findObject("accounts");
    const uniqueClients = [...new Set(contas.map((acc) => acc.idCliente))];

    const clientsWithAccounts = [];

    for (const idCliente of uniqueClients) {
      const client = await findObjectId("clients", idCliente);
      clientsWithAccounts.push({
        id: idCliente,
        nome: client.nome.toUpperCase(),
      });
    }

    clientsWithAccounts.sort((a, b) => a.nome.localeCompare(b.nome));

    for (const client of clientsWithAccounts) {
      const option1 = newTag("option");
      option1.value = client.id;
      option1.innerText = client.nome;

      const option2 = option1.cloneNode(true);

      selectClientName.appendChild(option1);
      selectTransactionClient.appendChild(option2);
    }
  } catch (error) {
    console.log(error);
  }
}

async function accountsClientSelected(idCLiente) {
  selectClientAccount.length = 1;
  selectTransactionAccount.length = 1;

  const contasCliente = await findObjectKeyValue(
    "accounts",
    "idCliente",
    idCLiente,
  );

  for (const conta of contasCliente) {
    const numeroConta = conta.numeroConta;
    const id = conta.id;
    const tipoConta = conta.tipoConta.toUpperCase();

    const option1 = newTag("option");
    option1.value = id;
    option1.innerHTML = `${numeroConta} - ${tipoConta}`;

    const option2 = option1.cloneNode(true);

    selectClientAccount.appendChild(option1);
    selectTransactionAccount.appendChild(option2);
  }
}

selectClientName.addEventListener("input", async (event) => {
  try {
    const idClient = event.target.value;

    if (idClient === "allAccounts") {
      const transacoes = await findObject("transactions");
      await renderizarTransactions(transacoes);
      selectClientAccount.disabled = true;
    } else {
      accountsClientSelected(idClient);
      selectClientAccount.disabled = false;
      const transacoes = await findObjectKeyValue(
        "transactions",
        "idCliente",
        idClient,
      );
      await renderizarTransactions(transacoes);
    }
  } catch (error) {
    console.log(error);
  }
});

selectTransactionClient.addEventListener("input", async (event) => {
  const idClient = event.target.value;
  accountsClientSelected(idClient);
  selectTransactionAccount.disabled = false;
});

selectClientAccount.addEventListener("input", async (event) => {
  const idConta = event.target.value;

  const transacoes = await findObjectKeyValue(
    "transactions",
    "idConta",
    idConta,
  );

  renderizarTransactions(transacoes);
});
