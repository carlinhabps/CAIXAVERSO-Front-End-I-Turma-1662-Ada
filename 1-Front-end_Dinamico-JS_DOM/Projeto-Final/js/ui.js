// ! renderização - DADOS

const newTag = (tag) => document.createElement(tag);

// ! Criar as informações na tabela

function renderizarClients(clients) {
  clientsList.innerHTML = "";

  clients.forEach(({ nome, cpf, email }) => {
    const row = newTag("tr");

    const colName = newTag("td");
    const colCpf = newTag("td");
    const colEmail = newTag("td");

    colName.innerText = nome;
    colCpf.innerText = cpf;
    colEmail.innerText = email;

    row.append(colName, colCpf, colEmail);
    clientsList.appendChild(row);
  });
}

async function renderizarAccounts(accounts) {
  accountsList.innerHTML = "";

  for (const { numeroConta, idCliente, tipoConta, saldo, status } of accounts) {
    const client = await findClientsId(idCliente);
    const nameClient = client.nome;

    const row = newTag("tr");

    const colAccount = newTag("td");
    const colClientName = newTag("td");
    const colAccountType = newTag("td");
    const colSaldo = newTag("td");
    const colStatus = newTag("td");

    colAccount.innerText = numeroConta;
    colClientName.innerText = nameClient;
    colAccountType.innerText = tipoConta;
    colSaldo.innerText = saldo;
    colStatus.innerText = status;

    row.append(colAccount, colClientName, colAccountType, colSaldo, colStatus);
    accountsList.appendChild(row);
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

    const row = newTag("tr");

    const colDate = newTag("td");
    const colClientName = newTag("td");
    const colAccount = newTag("td");
    const colDescription = newTag("td");
    const colValor = newTag("td");
    const colSaldo = newTag("td");

    colDate.innerText = formatDate(dataTransacao);
    colClientName.innerText = nameClient;
    colAccount.innerText = numberAccount;
    colDescription.innerText = tipoTransacao;
    colValor.innerText = valorTransacao;
    colSaldo.innerText = novoSaldo;

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

// ! Mostrar informações na tabela

async function showClients() {
  try {
    const information = await findClients();
    renderizarClients(information);
  } catch (error) {
    console.log(error);
  }
}

async function showAccounts() {
  try {
    const information = await findAccounts();
    await renderizarAccounts(information);
  } catch (error) {
    console.log(error);
  }
}

async function showTransactions() {
  try {
    const information = await findTransactions();
    renderizarTransactions(information);
  } catch (error) {
    console.log(error);
  }
}

// ! FORMULÁRIO TRANSAÇÕES

const hoje = new Date().toLocaleDateString("sv-SE");

today.value = hoje;
today.min = hoje;
today.max = hoje;

selectTransactionMoviment.addEventListener("change", (event) => {
  console.log(event);

  const resposta = event.target.value;

  if (resposta === "sacar") {
    btnDeposito.classList.add("hiddenContent");
    btnSaque.classList.remove("hiddenContent");
  } else if (resposta === "depositar") {
    btnDeposito.classList.remove("hiddenContent");
    btnSaque.classList.add("hiddenContent");
  } else {
    btnSaque.classList.remove("hiddenContent");
    btnDeposito.classList.remove("hiddenContent");
  }
});
