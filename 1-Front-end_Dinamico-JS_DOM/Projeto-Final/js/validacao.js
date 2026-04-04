// ! validações

function validacaoCliente(name, cpf, email) {
  if (name === "" || cpf === "" || email === "") {
    errorMensageClient.innerText = "Há campo obrigatório não preenchido";
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
