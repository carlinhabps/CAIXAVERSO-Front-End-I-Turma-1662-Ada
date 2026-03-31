// ! validações

// Funções

function validacaoCliente(name, cpf, email) {
  if (name === "" || cpf === "" || email === "") {
    errorMensageClient.innerText = "Há campo obrigatório não preenchido";
    errorMensageClient.classList.remove("hiddenContent");
    errorMensageClient.classList.add("errorMensageClient");
    return false;
  }

  if (cpf.length !== 11) {
    errorMensageClient.innerText = "Digite o CPF com 11 dígitos";
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

newAccountForm.addEventListener("submit", (event) => {
  event.preventDefault();

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
