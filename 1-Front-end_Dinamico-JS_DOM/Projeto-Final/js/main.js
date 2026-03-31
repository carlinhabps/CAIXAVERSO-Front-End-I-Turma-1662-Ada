// ! lógica principal

carregarInfo();
// dadosNomeCliente();

newClientForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = inputClientName.value.toLowerCase();
  const cpf = Number(inputClientCpf.value.replace(/\D/g, ""));
  const email = inputClientEmail.value.toLowerCase();

  if (!validacaoCliente(nome, cpf, email)) return;

  try {
    await dataNewClient({ nome, cpf, email });
    newClientForm.reset();
    carregarInfo();
    gestaoClientes();
  } catch (error) {
    console.log(error);
  }
});
