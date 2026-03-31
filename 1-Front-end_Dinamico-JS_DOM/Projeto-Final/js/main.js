// ! lógica principal

carregarInfo();
// dadosNomeCliente();

newClientForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = inputClientName.value;
  const cpf = inputClientCpf.value;
  const email = inputClientEmail.value;

  if (!validacaoCliente(nome, cpf, email)) return;

  try {
    await dataNewClient({ nome, cpf, email });
    newClientForm.reset();
    carregarInfo();
  } catch (error) {
    console.log(error);
  }
});
