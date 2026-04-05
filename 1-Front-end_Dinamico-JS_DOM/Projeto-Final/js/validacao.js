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
    deleteClientP.innerHTML = `Cliente possui <span>${contasAtivas} contas ativas</span>, não é possível excluí-lo do cadastro!`;
    deleteClientDiv.classList.remove("hiddenContent");
    deleteClientBtnSim.classList.add("hiddenContent");
    deleteClientBtnNao.innerText = "Cancelar";
    consultContasCliente();
    return false;
  }
  if (contasAtivas === 1) {
    deleteClientP.innerHTML = `Cliente possui <span>${contasAtivas} conta ativa</span>, não é possível excluí-lo do cadastro!`;
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

function validaEncerramentoConta(account) {
  //
}

// ! ========== TRANSAÇÕES ========== ! //
