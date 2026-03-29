// ! validações

const doc = (select) => document.querySelector(select);

// id
const navBarContainer = doc("#navBarContainer");
const homeLogo = doc("#homeLogo");
const navClients = doc("#navClients");
const navAccounts = doc("#navAccounts");
const navTransactions = doc("#navTransactions");
const containerWelcome = doc("#containerWelcome");
const titleH1 = doc("#titleH1");
const btnClients = doc("#btnClients");
const btnAccounts = doc("#btnAccounts");
const btnTransactions = doc("#btnTransactions");
const containerClients = doc("#containerClients");
const inputClientName = doc("#inputClientName");
const inputClientCpf = doc("#inputClientCpf");
const inputClientEmail = doc("#inputClientEmail");
const newClientForm = doc("#newClientForm");
const btnRegisterNewClient = doc("#btnRegisterNewClient");
const btnConsultClient = doc("#btnConsultClient");
const btnEditClient = doc("#btnEditClient");
const btnDeleteClient = doc("#btnDeleteClient");
const containerAccounts = doc("#containerAccounts");
const selectAccountClient = doc("#selectAccountClient");
const selectAccountType = doc("#selectAccountType");
const selectAccountStatus = doc("#selectAccountStatus");
const newAccountForm = doc("#newAccountForm");
const btnRegisterAccount = doc("#btnRegisterAccount");
const btnConsultAccount = doc("#btnConsultAccount");
const btnEditAccount = doc("#btnEditAccount");
const btnDeleteAccount = doc("#btnDeleteAccount");
const containerTransactions = doc("#containerTransactions");
const clientName = doc("#clientName");
const selectClientName = doc("#selectClientName");
const selectClientAccount = doc("#selectClientAccount");
const transactionsList = doc("#transactionsList");

// classes
const errorMensageClient = doc(".errorMensageClient");
const errorMensageAccount = doc(".errorMensageAccount");
const errorMensageTransaction = doc(".errorMensageTransaction");

// tag
const nav = doc("nav");

// Funções

newClientForm.addEventListener("submit", (event) => {
  event.preventDefault();

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
  event.preventDefault();

  const cliente = selectAccountClient.value;
  const tipo = selectAccountType.value;
  const satatus = selectAccountStatus.value;

  if (cliente === "defaul" || tipo === "defaul" || satatus === "defaul") {
    errorMensageAccount.innerText = "Há campo obrigatório não preenchido!";
    errorMensageAccount.classList.remove("hiddenContent");
    errorMensageAccount.classList.add("errorMensageAccount");
    return;
  }

  errorMensageAccount.classList.add("hiddenContent");

  newAccountForm.reset();
});
