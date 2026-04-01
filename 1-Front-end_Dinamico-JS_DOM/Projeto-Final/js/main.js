// ! lógica principal

carregarInfo();
// dadosNomeCliente();

// ! CLIENTES

newClientForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const action = event.target.dataset.action;

  const id = inputClientId.value;
  const nome = inputClientName.value.toLowerCase();
  const cpf = Number(inputClientCpf.value.replace(/\D/g, ""));
  const email = inputClientEmail.value.toLowerCase();

  if (!validacaoCliente(nome, cpf, email)) return;

  try {
    if (action === "salvar") {
      await dataNewClient({ nome, cpf, email });
    } else if (action === "editar") {
      await editClient({ id, nome, cpf, email });
    }
    newClientForm.reset();
    carregarInfo();
    gestaoClientes();
  } catch (error) {
    console.log(error);
  }

  console.log(event);
});

// ! CONTAS

// ! botão ainda não esta funcionando.. VERIFICAR
newAccountForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const action = event.target.dataset.action;

    const id = inputAccountId.value;
    const idCliente = "0";
    const numeroConta = "0";
    const tipoConta = selectAccountType.value;
    const saldo = "0";
    const status = selectAccountStatus.value;

    // if (!validacaoCliente(nome, cpf, email)) return;

    if (action === "salvar") {
      await dataNewAccount({ nome, cpf, email });
    } else if (action === "editar") {
      await editAccount({ id, nome, cpf, email });
    }
    newAccountForm.reset();
    carregarInfo();
    gestaoContas();
  } catch (error) {
    console.log(error);
  }

  console.log(event);
});
