// ! renderização - DADOS

const newTag = (tag) => document.createElement(tag);

// ! EXIBIR DADOS

async function carregarInfo() {
  try {
    const clientes = await findObject(clients);
    renderizarClients(clientes);

    const contas = await findAccounts();
    await renderizarAccounts(contas);

    const transacoes = await findTransactions();
    renderizarTransactions(transacoes);
  } catch (error) {
    console.log(error);
  }
}

// ! CLIENTES

function renderizarClients(clients) {
  clientsList.innerHTML = "";

  clients.forEach(({ nome, cpf, email }) => {
    const cpfCompleto = String(cpf).padStart(11, 0);
    const cpfFormatado = cpfCompleto.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4",
    );

    const row = newTag("tr");

    const colName = newTag("td");
    const colCpf = newTag("td");
    const colEmail = newTag("td");

    colName.innerText = nome.toUpperCase();
    colCpf.innerText = cpfFormatado;
    colEmail.innerText = email.toLowerCase();

    row.append(colName, colCpf, colEmail);
    clientsList.appendChild(row);
  });
}

// ! CADASTRAR CLIENTES

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

//  CONSULTAR CLIENTES

clientsList.addEventListener("click", async (event) => {
  const row = event.target.closest("tr");
  if (!row) return;

  document.querySelectorAll(".clientsList tr").forEach((tr) => {
    tr.classList.remove("selectedRow");
  });

  row.classList.add("selectedRow");

  const cpfSelecionado = row.children[1].innerText.replace(/\D/g, "");
  const cpfNumero = Number(cpfSelecionado);

  const clientes = await findObject(clients);
  const cliente = clientes.find((c) => c.cpf === cpfNumero);

  if (!cliente) {
    window.idClienteSelecionado = null;
    return;
  }

  window.idClienteSelecionado = cliente.id;
});

document.addEventListener("click", (event) => {
  if (
    event.target.closest(".clientsList") ||
    event.target.closest("#btnConsultClient") ||
    event.target.closest("#btnEditClient") ||
    event.target.closest("#btnDeleteClient") ||
    event.target.closest("#newClientForm")
  ) {
    return;
  }

  document.querySelectorAll(".clientsList tr").forEach((tr) => {
    tr.classList.remove("selectedRow");
  });

  window.idClienteSelecionado = null;
});

// ! Criar as informações na tabela

async function renderizarAccounts(accounts) {
  accountsList.innerHTML = "";

  for (const { numeroConta, idCliente, tipoConta, saldo, status } of accounts) {
    const client = await findClientsId(idCliente);
    const nomeFormatado = client.nome.toUpperCase();

    const saldoFormatado = Number(saldo).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const statusFormatado = status.toUpperCase();

    const row = newTag("tr");

    const colAccount = newTag("td");
    const colClientName = newTag("td");
    const colAccountType = newTag("td");
    const colSaldo = newTag("td");
    const colStatus = newTag("td");

    colAccount.innerText = Number(numeroConta);
    colClientName.innerText = nomeFormatado;
    colAccountType.innerText = tipoConta.toUpperCase();
    colSaldo.innerText = Number(saldoFormatado);
    colStatus.innerText = statusFormatado;

    row.append(colAccount, colClientName, colAccountType, colSaldo, colStatus);
    accountsList.appendChild(row);

    if (statusFormatado === "ENCERRADA") {
      row.classList.add("closedAccount");
    } else {
      row.classList.remove("closedAccount");
    }
  }
}

async function renderizarTransactions(transactions) {
  transactionsList.innerHTML = "";

  for (const {
    dataTransacao,
    idConta,
    tipoTransacao,
    valorTransacao,
    novoSaldo,
  } of transactions) {
    const account = await findAccountsIdConta(idConta);
    const numberAccount = account.numeroConta;

    const idCliente = account.idCliente;
    const client = await findClientsId(idCliente);
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

// ! FORMULÁRIO TRANSAÇÕES

// const hoje = new Date().toLocaleDateString("sv-SE");

// today.value = hoje;
// today.min = hoje;
// today.max = hoje;

// selectTransactionMoviment.addEventListener("change", (event) => {
//   console.log(event);

//   const resposta = event.target.value;

//   if (resposta === "sacar") {
//     btnDeposito.classList.add("hiddenContent");
//     btnSaque.classList.remove("hiddenContent");
//   } else if (resposta === "depositar") {
//     btnDeposito.classList.remove("hiddenContent");
//     btnSaque.classList.add("hiddenContent");
//   } else {
//     btnSaque.classList.remove("hiddenContent");
//     btnDeposito.classList.remove("hiddenContent");
//   }
// });

// ! ADICIONAR DADOS AOS SELECTs

// async function dadosSelectAccountClient(accounts) {
//   selectAccountClient.length = 1;

//   const uniqueClients = [
//     ...new Set(accounts.map((account) => account.idCliente)),
//   ];

//   for (const idCliente of uniqueClients) {
//     const client = await findClientsId(idCliente);
//     const nomeFormatado = client.nome.toUpperCase();

//     const option = newTag("option");
//     option.value = idCliente;
//     option.innerText = nomeFormatado;

//     selectAccountClient.appendChild(option);
//   }
// }
// async function dadosNomeCliente() {
//   selectAccountClient.length = 1;
//   selectClientName.length = 1;
//   selectTransactionClient.length = 1;

//   const clients = await findObject(clients);

//   clients.sort((a, b) => a.nome.localeCompare(b.nome));

//   clients.forEach(({ nome, id }) => {
//     const nomeFormatado = nome.toUpperCase();

//     const option1 = newTag("option");
//     option1.value = id;
//     option1.innerText = nomeFormatado;

//     const option2 = option1.cloneNode(true);
//     const option3 = option1.cloneNode(true);

//     selectAccountClient.appendChild(option1);
//     selectClientName.appendChild(option2);
//     selectTransactionClient.appendChild(option3);
//   });
// }

selectClientName.addEventListener("input", async (event) => {
  const idClient = event.target.value;

  const allAccounts = await findAccounts();
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
