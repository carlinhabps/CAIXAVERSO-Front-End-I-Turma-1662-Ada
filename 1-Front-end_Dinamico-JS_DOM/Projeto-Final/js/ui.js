// ! renderização - DADOS

const newTag = (tag) => document.createElement(tag);

// ! ============================== EXIBIR DADOS | RENDERIZAÇÃO ============================== ! //

async function carregarInfo() {
  try {
    const clientes = await findObject("clients");
    renderizarClients(clientes);

    const contas = await findObject("accounts");
    await renderizarAccounts(contas);

    const transacoes = await findObject("transactions");
    await renderizarTransactions(transacoes);
  } catch (error) {
    console.log(error);
  }
}

// ! ========== CLIENTES ========== ! //

async function renderizarClients(clients) {
  try {
    clientsList.innerHTML = "";

    if (clients.length === 0) {
      await noClients();
    } else {
      clients.forEach(({ id, nome, cpf, email }) => {
        const cpfCompleto = String(cpf).padStart(11, 0);
        const cpfFormatado = cpfCompleto.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          "$1.$2.$3-$4",
        );

        const row = newTag("tr");

        const colId = newTag("td");
        const colName = newTag("td");
        const colCpf = newTag("td");
        const colEmail = newTag("td");

        colId.innerText = id;
        colName.innerText = nome.toUpperCase();
        colCpf.innerText = cpfFormatado;
        colEmail.innerText = email.toLowerCase();

        colId.classList.add("hiddenContent");

        row.append(colId, colName, colCpf, colEmail);
        clientsList.appendChild(row);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// ! ========== CONTAS ========== ! //

async function renderizarAccounts(accounts) {
  try {
    accountsList.innerHTML = "";

    if (accounts.length === 0) {
      await noAccounts();
    } else {
      btnConsultAccount.classList.remove("hiddenContent");
      btnEditAccount.classList.remove("hiddenContent");

      for (const {
        id,
        numeroConta,
        idCliente,
        tipoConta,
        saldo,
        status,
      } of accounts) {
        const client = await findObjectId("clients", idCliente);
        const nomeFormatado = client.nome.toUpperCase();

        const saldoFormatado = Number(saldo).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const statusFormatado = status.toUpperCase();

        const row = newTag("tr");

        const colId = newTag("td");
        const colAccount = newTag("td");
        const colClientName = newTag("td");
        const colAccountType = newTag("td");
        const colSaldo = newTag("td");
        const colStatus = newTag("td");

        colId.innerText = id;
        colAccount.innerText = Number(numeroConta);
        colClientName.innerText = nomeFormatado;
        colAccountType.innerText = tipoConta.toUpperCase();
        colSaldo.innerText = saldoFormatado;
        colStatus.innerText = statusFormatado;

        colId.classList.add("hiddenContent");

        row.append(
          colId,
          colAccount,
          colClientName,
          colAccountType,
          colSaldo,
          colStatus,
        );
        accountsList.appendChild(row);

        if (statusFormatado.toLowerCase() === "encerrada") {
          row.classList.add("closedAccount");
        } else {
          row.classList.remove("closedAccount");
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// ! ========== TRANSAÇÕES ========== ! //

async function renderizarTransactions(transactions) {
  transactionsList.innerHTML = "";
  try {
    if (transactions.length === 0) {
      await noTransactions();
    } else {
      for (const {
        dataTransacao,
        idConta,
        tipoTransacao,
        valorTransacao,
        novoSaldo,
      } of transactions) {
        const account = await findObjectId("accounts", idConta);
        const numberAccount = account.numeroConta;

        const idCliente = account.idCliente;
        const client = await findObjectId("clients", idCliente);
        const nameClient = client.nome;

        function formatDate(dataISO) {
          const [ano, mes, dia] = dataISO.split("-");
          return `${dia}/${mes}/${ano}`;
        }

        const valorFormatado = Number(valorTransacao).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const saldoFormatado = Number(novoSaldo).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const row = newTag("tr");

        const colDate = newTag("td");
        const colClientName = newTag("td");
        const colAccount = newTag("td");
        const colDescription = newTag("td");
        const colValor = newTag("td");
        const colSaldo = newTag("td");

        colDate.innerText = formatDate(dataTransacao);
        colClientName.innerText = nameClient.toUpperCase();
        colAccount.innerText = numberAccount;
        colDescription.innerText = tipoTransacao.toUpperCase();
        colValor.innerText = valorFormatado;
        colSaldo.innerText = saldoFormatado;

        row.append(
          colDate,
          colClientName,
          colAccount,
          colDescription,
          colValor,
          colSaldo,
        );
        transactionsList.appendChild(row);
      }

      const newRow = doc(".transactionsList tr");
      newRow.classList.add("rowTransactions");
    }
  } catch (error) {
    console.log(error);
  }
}

// ! ==================== SELEÇÃO LINHA DA TABELA ==================== ! //

// * selecionar cliente pela tabela
clientsList.addEventListener("click", async (event) => {
  const row = event.target.closest("tr");
  if (!row) return;

  document.querySelectorAll(".clientsList tr").forEach((tr) => {
    tr.classList.remove("selectedRow");
  });

  row.classList.add("selectedRow");

  const cliente = row.children[0].innerText;

  if (!cliente) {
    window.idClienteSelecionado = null;
    return;
  }

  window.idClienteSelecionado = cliente;
});

accountsList.addEventListener("click", async (event) => {
  const row = event.target.closest("tr");
  if (!row) return;

  document.querySelectorAll(".accountsList tr").forEach((tr) => {
    tr.classList.remove("selectedRow");
  });

  row.classList.add("selectedRow");

  const conta = row.children[0].innerText;

  if (!conta) {
    window.idContaSelecionada = null;
    return;
  }

  window.idContaSelecionada = conta;
});

// * desmarcar a seleção da linha da tabela
document.addEventListener("click", (event) => {
  if (
    event.target.closest(".clientsList") ||
    event.target.closest(".accountsList") ||
    event.target.closest("#btnConsultClient") ||
    event.target.closest("#btnConsultAccount") ||
    event.target.closest("#btnRegisterNewAccount") ||
    event.target.closest("#btnEditClient") ||
    event.target.closest("#btnEditAccount") ||
    event.target.closest("#btnDeleteClient") ||
    event.target.closest("#btnDeleteAccount") ||
    event.target.closest("#deleteClientDiv") ||
    event.target.closest("#deleteAccountDiv") ||
    event.target.closest("#deleteAccountBtnSim") ||
    event.target.closest("#deleteAccountBtnNao") ||
    event.target.closest("#newClientForm") ||
    event.target.closest("#newAccountForm")
  ) {
    return;
  }

  document.querySelectorAll(".clientsList tr").forEach((tr) => {
    tr.classList.remove("selectedRow");
  });

  document.querySelectorAll(".accountsList tr").forEach((tr) => {
    tr.classList.remove("selectedRow");
  });

  window.idClienteSelecionado = null;
  window.idContaSelecionada = null;
});

// ! ==================== BANCO DE DADOS VAZIO ==================== ! //

async function noClients() {
  const row = newTag("tr");
  const col = newTag("td");

  col.colSpan = 3;
  col.classList.add("errorMensageNoAccount");

  col.innerText = `Não há cliente cadastrado!`;

  row.appendChild(col);
  clientsList.appendChild(row);

  btnConsultClient.classList.add("hiddenContent");
  btnEditClient.classList.add("hiddenContent");
  btnDeleteClient.classList.add("hiddenContent");
}

async function noAccounts() {
  const row = newTag("tr");
  const col = newTag("td");

  col.colSpan = 5;
  col.classList.add("errorMensageNoAccount");

  const arrClientes = await findObject("clients");

  if (arrClientes.length === 0) {
    col.innerText = `Não há cliente cadastrado!`;
    btnRegisterNewAccount.classList.add("hiddenContent");
  } else if (!window.idClienteSelecionado) {
    col.innerText = `Não há conta cadastrada!`;
    btnRegisterNewAccount.classList.remove("hiddenContent");
  } else {
    const cliente = await findObjectId("clients", window.idClienteSelecionado);
    const nomeCliente = cliente.nome;
    col.innerText = `${nomeCliente} não possui conta cadastrada!`;
    btnRegisterNewAccount.classList.remove("hiddenContent");
  }

  row.appendChild(col);
  accountsList.appendChild(row);

  btnConsultAccount.classList.add("hiddenContent");
  btnEditAccount.classList.add("hiddenContent");
  btnDeleteAccount.classList.add("hiddenContent");
}

async function noTransactions() {
  const row = newTag("tr");
  const col = newTag("td");

  col.colSpan = 6;
  col.classList.add("errorMensageNoAccount");

  const arrClientes = await findObject("clients");
  const arrContas = await findObject("accounts");

  if (arrClientes.length === 0) {
    col.innerText = `Não há cliente cadastrado!`;
    btnDeposito.classList.add("hiddenContent");
    btnSaque.classList.add("hiddenContent");
  } else if (arrContas.length === 0) {
    col.innerText = `Não há conta cadastrada!`;
    btnDeposito.classList.add("hiddenContent");
    btnSaque.classList.add("hiddenContent");
  } else if (!window.idContaSelecionada) {
    col.innerText = `Não há transação cadastrada!`;
  } else {
    const conta = await findObjectId("accounts", window.idContaSelecionada);
    const numberAccount = conta.numeroConta;
    const idCliente = conta.idCliente;
    const Cliente = await findObjectId("clients", idCliente);
    const nomeCliente = Cliente.nome;
    col.innerText = `A conta nº ${numberAccount}, de ${nomeCliente}, não possui transação cadastrada!`;
    btnDeposito.classList.remove("hiddenContent");
    btnSaque.classList.remove("hiddenContent");
  }

  row.appendChild(col);
  transactionsList.appendChild(row);
}

// ! ================================================================================ ! //

// ! ADICIONAR DADOS AOS SELECTs
async function nameClientsWithAccounts(accounts) {
  try {
    selectClientName.length = 1;
    selectTransactionClient.length = 1;

    const uniqueClients = [
      ...new Set(accounts.map((account) => account.idCliente)),
    ];

    for (const idCliente of uniqueClients) {
      const client = await findObjectId("clients", idCliente);
      const nomeFormatado = client.nome.toUpperCase();

      const option1 = newTag("option");
      option1.value = idCliente;
      option1.innerText = nomeFormatado;

      const option2 = option1.cloneNode(true);

      selectClientName.appendChild(option1);
      selectTransactionClient.appendChild(option2);
    }
  } catch (error) {
    console.log(error);
  }
}

// ! section transactions
selectClientName.addEventListener("input", async (event) => {
  const idClient = event.target.value;

  const allAccounts = await findObject("accounts");
  const accountsClient = allAccounts.filter(
    (account) => account.idCliente == idClient,
  );

  selectClientAccount.disabled = false;
  selectClientAccount.length = 2;

  selectTransactionAccount.disabled = false;
  selectTransactionAccount.length = 2;

  accountsClient.forEach(({ id, numeroConta }) => {
    const option1 = newTag("option");
    option1.value = id;
    option1.innerText = numeroConta;

    const option2 = option1.cloneNode(true);

    selectClientAccount.appendChild(option1);
    selectTransactionAccount.appendChild(option2); // ! SE FOR MANTER O FORMULÁRIO
  });
});
