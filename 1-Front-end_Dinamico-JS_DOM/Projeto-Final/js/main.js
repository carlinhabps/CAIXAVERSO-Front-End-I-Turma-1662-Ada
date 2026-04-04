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

    if (!validacaoCliente(nome, cpf, email)) return;

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
