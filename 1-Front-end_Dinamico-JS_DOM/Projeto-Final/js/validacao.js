// ! validações

// ! ============================== VALIDAÇÕES ============================== ! //

// ! ========== CLIENTES ========== ! //

async function validacaoCliente(name, cpf, email) {
  if (name === "" || cpf == 0 || email === "") {
    errorMensageClient.innerText = "Há campo obrigatório não preenchido";
    errorMensageClient.classList.remove("hiddenContent");
    errorMensageClient.classList.add("errorMensageClient");
    return false;
  }

  const clients = await findObject("clients");
  const cpfCadastrados = clients.map((i) => i.cpf);
  if (cpfCadastrados.includes(cpf)) {
    errorMensageClient.innerText = "CPF já cadastrado";
    errorMensageClient.classList.remove("hiddenContent");
    errorMensageClient.classList.add("errorMensageClient");
    return false;
  }

  if (!email.includes("@")) {
    errorMensageClient.innerText = "Digite um e-mail válido";
    errorMensageClient.classList.remove("hiddenContent");
    errorMensageClient.classList.add("errorMensageClient");
    return false;
  }

  errorMensageClient.classList.add("hiddenContent");
  return true;
}

async function validaExclusaoCliente(id) {
  deleteClientP.innerHTML = "";
  const contasCliente = await findObjectKeyValue("accounts", "idCliente", id);

  if (contasCliente.length === 0) return true;

  const statusContas = contasCliente.map((acc) => acc.status.toLowerCase());
  const contasAtivas = statusContas.filter((s) => s === "ativa").length;
  if (contasAtivas > 1) {
    deleteClientP.innerHTML = `Cliente possui <span>${contasAtivas} contas ativas</span>, não é possível proceder com a exclusão do cadastro!`;
    deleteClientDiv.classList.remove("hiddenContent");
    deleteClientBtnSim.classList.add("hiddenContent");
    deleteClientBtnNao.innerText = "Cancelar";
    consultContasCliente();
    return false;
  }
  if (contasAtivas === 1) {
    deleteClientP.innerHTML = `Cliente possui <span>${contasAtivas} conta ativa</span>, não é possível proceder com a exclusão do cadastro!`;
    deleteClientDiv.classList.remove("hiddenContent");
    deleteClientBtnSim.classList.add("hiddenContent");
    deleteClientBtnNao.innerText = "Cancelar";
    consultContasCliente();
    return false;
  }

  return true;
}

// ! ========== CONTAS ========== ! //

function validacaoConta(idCliente, tipoConta) {
  if (idCliente === "default" || tipoConta === "default") {
    errorMensageAccount.innerText = "Há campo obrigatório não preenchido!";
    errorMensageAccount.classList.remove("hiddenContent");
    errorMensageAccount.classList.add("errorMensageAccount");
    return;
  }
  errorMensageAccount.classList.add("hiddenContent");
  return true;
}

function validaSaldoConta(saldo) {
  if (!(saldo === 0)) {
    deleteAccountP.innerHTML =
      "Conta <span>possui saldo</span> e não pode ser encerrada ou excluída!";
    deleteAccountDiv.classList.remove("hiddenContent");
    deleteAccountBtnSim.classList.add("hiddenContent");
    deleteAccountBtnNao.innerText = "Cancelar";
    consultContasCliente();
    return;
  }
  return true;
}

function validaStatusConta(status) {
  if (status === "ativa") {
    deleteAccountP.innerHTML =
      "A conta está <span>ativa</span> e não pode ser excluída!";
    deleteAccountDiv.classList.remove("hiddenContent");
    deleteAccountBtnSim.classList.add("hiddenContent");
    deleteAccountBtnNao.innerText = "Cancelar";
    consultContasCliente();
    return;
  }
  return true;
}

// ! ========== TRANSAÇÕES ========== ! //

async function validaSaque(valor) {
  const idConta = selectTransactionAccount.value;
  const contaMovimentada = await findObjectId("accounts", idConta);
  const saldo = Number(contaMovimentada.saldo);

  if (valor > saldo) {
    const saldoFormatado = Number(saldo).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    mensageTransaction.innerHTML = `Saldo insuficiente para a transação. Seu saldo atual é de ${saldoFormatado}`;
    mensageTransaction.classList.remove("hiddenContent");
    mensageTransaction.classList.add("errorMensageTransaction");
    mensageTransaction.classList.remove("okMensageTransaction");
    btnSaveTransaction.classList.add("hiddenContent");
    return false;
  }
  mensageTransaction.classList.add("hiddenContent");
  btnSaveTransaction.classList.remove("hiddenContent");
  return true;
}
