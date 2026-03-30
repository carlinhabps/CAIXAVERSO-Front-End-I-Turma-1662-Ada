// ! validações

// Funções

newClientForm.addEventListener("submit", (event) => {
  event.preventdefaultt();

  const name = inputClientName.value;
  const cpf = inputClientCpf.value;
  const email = inputClientEmail.value;

  if (name === "" || cpf === "" || email === "") {
    errorMensageClient.innerText = "Há campo obrigatório não preenchido";
    errorMensageClient.classList.remove("hiddenContent");
    errorMensageClient.classList.add("errorMensageClient");
    return;
  }

  if (!email.includes("@")) {
    errorMensageClient.innerText = "Digite um e-mail válido";
    errorMensageClient.classList.remove("hiddenContent");
    errorMensageClient.classList.add("errorMensageClient");
    return;
  }

  errorMensageClient.classList.add("hiddenContent");

  newClientForm.reset();
});

newAccountForm.addEventListener("submit", (event) => {
  event.preventdefaultt();

  const cliente = selectAccountClient.value;
  const tipo = selectAccountType.value;
  const satatus = selectAccountStatus.value;

  if (cliente === "default" || tipo === "default" || satatus === "default") {
    errorMensageAccount.innerText = "Há campo obrigatório não preenchido!";
    errorMensageAccount.classList.remove("hiddenContent");
    errorMensageAccount.classList.add("errorMensageAccount");
    return;
  }

  errorMensageAccount.classList.add("hiddenContent");

  newAccountForm.reset();
});
