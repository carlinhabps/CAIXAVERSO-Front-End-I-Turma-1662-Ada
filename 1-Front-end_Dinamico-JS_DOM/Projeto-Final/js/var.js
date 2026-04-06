const doc = (select) => document.querySelector(select);

// id
const navBarContainer = doc("#navBarContainer");
const homeLogo = doc("#homeLogo");
const navClients = doc("#navClients");
const navAccounts = doc("#navAccounts");
const navTransactions = doc("#navTransactions");
const containerWelcome = doc("#containerWelcome");
const btnClients = doc("#btnClients");
const btnAccounts = doc("#btnAccounts");
const btnTransactions = doc("#btnTransactions");
const containerClients = doc("#containerClients");
const inputClientId = doc("#inputClientId");
const inputClientName = doc("#inputClientName");
const inputClientCpf = doc("#inputClientCpf");
const inputClientEmail = doc("#inputClientEmail");
const newClientForm = doc("#newClientForm");
const btnRegisterNewClient = doc("#btnRegisterNewClient");
const btnConsultClient = doc("#btnConsultClient");
const btnEditClient = doc("#btnEditClient");
const btnDeleteClient = doc("#btnDeleteClient");
const deleteClientP = doc("#deleteClientP");
const deleteClientDiv = doc("#deleteClientDiv");
const deleteClientBtnSim = doc("#deleteClientBtnSim");
const deleteClientBtnNao = doc("#deleteClientBtnNao");
const btnCancelClient = doc("#btnCancelClient");
const containerAccounts = doc("#containerAccounts");
const selectAccountClient = doc("#selectAccountClient");
const selectAccountType = doc("#selectAccountType");
const newAccountForm = doc("#newAccountForm");
const btnRegisterNewAccount = doc("#btnRegisterNewAccount");
const btnConsultAccount = doc("#btnConsultAccount");
const btnEditAccount = doc("#btnEditAccount");
const btnDeleteAccount = doc("#btnDeleteAccount");
const deleteAccountDiv = doc("#deleteAccountDiv");
const deleteAccountP = doc("#deleteAccountP");
const deleteAccountBtnSim = doc("#deleteAccountBtnSim");
const deleteAccountBtnNao = doc("#deleteAccountBtnNao");
const btnCancelAccount = doc("#btnCancelAccount");
const containerTransactions = doc("#containerTransactions");
const newTransactionForm = doc("#newTransactionForm");
const selectClientName = doc("#selectClientName");
const selectClientAccount = doc("#selectClientAccount");
// const today = doc("#today");
const selectTransactionClient = doc("#selectTransactionClient");
const selectTransactionAccount = doc("#selectTransactionAccount");
const btnSaveTransaction = doc("#btnSaveTransaction");
const btnCancelTransaction = doc("#btnCancelTransaction");
const inputTransactionValor = doc("#inputTransactionValor");

// classes
const errorMensageClient = doc(".errorMensageClient");
const errorMensageAccount = doc(".errorMensageAccount");
const errorMensageNoAccount = doc(".errorMensageNoAccount");
const mensageTransaction = doc(".mensageTransaction");
const clientsList = doc(".clientsList");
const accountsList = doc(".accountsList");
const transactionsList = doc(".transactionsList");
const btnDeposito = doc(".btnDeposito");
const btnSaque = doc(".btnSaque");

// tag
const nav = doc("nav");
