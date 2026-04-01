// ! lógica principal

carregarInfo();
// dadosNomeCliente();

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
