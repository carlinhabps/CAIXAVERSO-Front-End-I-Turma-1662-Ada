// ! renderização - DADOS

const newTag = (tag) => document.createElement(tag);

// ! Criar as informações na tabela

function renderizarClients(object) {
  clientsList.innerHTML = "";

  object.forEach(({ nome, cpf, email }) => {
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

function renderizarAccounts(object) {
  accountsList.innerHTML = "";

  object.forEach(({ numeroConta, idCliente, tipoConta, saldo, status }) => {
    const row = newTag("tr");

    // ! const nameClient = PROCURAR PELO idCliente

    const colAccount = newTag("td");
    const colClientName = newTag("td");
    const colAccountType = newTag("td");
    const colSaldo = newTag("td");
    const colStatus = newTag("td");

    colAccount.innerText = numeroConta;
    colClientName.innerText = idCliente; // ! ARRUMAR PRO NOME
    colAccountType.innerText = tipoConta;
    colSaldo.innerText = saldo;
    colStatus.innerText = status;

    row.append(colAccount, colClientName, colAccountType, colSaldo, colStatus);
    accountsList.appendChild(row);
  });
}

function renderizarTransactions(object) {
  transactionsList.innerHTML = "";

  object.forEach(
    ({ dataTransacao, idConta, tipoTransacao, valorTransacao, novoSaldo }) => {
      const row = newTag("tr");

      // ! const clientName = PROCURAR PELO idCliente
      // ! const accountNumber = PROCURAR PELO idCliente

      const colDate = newTag("td");
      const colClientName = newTag("td");
      const colAccount = newTag("td");
      const colDescription = newTag("td");
      const colValor = newTag("td");
      const colSaldo = newTag("td");

      colDate.innerText = dataTransacao;
      colClientName.innerText = idConta; // ! ARRUMAR PRO NOME
      colAccount.innerText = idConta; // ! ARRUMAR PRO NOME
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
    },
  );

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
    renderizarAccounts(information);
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
