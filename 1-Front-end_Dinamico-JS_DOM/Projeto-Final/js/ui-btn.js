// ! renderização - BOTÕES

navClients.addEventListener("click", (event) => {
  // inclui classes de transição
  setTimeout(() => {
    // exclui classes de transição
    // inclui/exclui classe com display none
  }, 500);
});

btnClients.addEventListener("click", (event) => {
  navBarContainer.classList.add("showContentTransition");
  nav.classList.add("showContentTransition");
  navClients.classList.add("hiddenContentTransition");
  containerWelcome.classList.add("hiddenContentTransition");
  containerClients.classList.add("showContentTransition");

  setTimeout(() => {
    navBarContainer.classList.remove("showContentTransition");
    nav.classList.remove("showContentTransition");
    navClients.classList.remove("hiddenContentTransition");
    containerWelcome.classList.remove("hiddenContentTransition");
    containerClients.classList.remove("showContentTransition");

    navBarContainer.classList.remove("hiddenNavBar");
    nav.classList.remove("hiddenContent");
    navClients.classList.add("hiddenContent");
    containerWelcome.classList.add("hiddenContent");
    containerClients.classList.remove("hiddenContent");
  }, 500);
});

btnAccounts.addEventListener("click", (event) => {
  navBarContainer.classList.add("showContentTransition");
  nav.classList.add("showContentTransition");
  navAccounts.classList.add("hiddenContentTransition");
  containerWelcome.classList.add("hiddenContentTransition");
  containerAccounts.classList.add("showContentTransition");

  setTimeout(() => {
    navBarContainer.classList.remove("showContentTransition");
    nav.classList.remove("showContentTransition");
    navAccounts.classList.remove("hiddenContentTransition");
    containerWelcome.classList.remove("hiddenContentTransition");
    containerAccounts.classList.remove("showContentTransition");

    navBarContainer.classList.remove("hiddenNavBar");
    nav.classList.remove("hiddenContent");
    navAccounts.classList.add("hiddenContent");
    containerWelcome.classList.add("hiddenContent");
    containerAccounts.classList.remove("hiddenContent");
  }, 500);
});

btnTransactions.addEventListener("click", (event) => {
  navBarContainer.classList.add("showContentTransition");
  nav.classList.add("showContentTransition");
  navTransactions.classList.add("hiddenContentTransition");
  containerWelcome.classList.add("hiddenContentTransition");
  containerTransactions.classList.add("showContentTransition");
  clientName.classList.add("hiddenContentTransition");

  setTimeout(() => {
    navBarContainer.classList.remove("showContentTransition");
    nav.classList.remove("showContentTransition");
    navTransactions.classList.remove("hiddenContentTransition");
    containerWelcome.classList.remove("hiddenContentTransition");
    containerTransactions.classList.remove("showContentTransition");
    clientName.classList.remove("hiddenContentTransition");

    navBarContainer.classList.remove("hiddenNavBar");
    nav.classList.remove("hiddenContent");
    navTransactions.classList.add("hiddenContent");
    containerWelcome.classList.add("hiddenContent");
    containerTransactions.classList.remove("hiddenContent");
    clientName.classList.add("hiddenContent");
  }, 500);
});

homeLogo.addEventListener("click", (event) => {
  navBarContainer.classList.add("hiddenContentTransition");
  nav.classList.add("hiddenContentTransition");
  containerWelcome.classList.add("hiddenContentTransition");
  containerClients.classList.add("hiddenContentTransition");
  containerAccounts.classList.add("hiddenContentTransition");
  containerTransactions.classList.add("hiddenContentTransition");
  navClients.classList.add("showContentTransition");
  navAccounts.classList.add("showContentTransition");
  navTransactions.classList.add("showContentTransition");

  setTimeout(() => {
    navBarContainer.classList.remove("hiddenContentTransition");
    nav.classList.remove("hiddenContentTransition");
    containerWelcome.classList.remove("hiddenContentTransition");
    containerClients.classList.remove("hiddenContentTransition");
    containerAccounts.classList.remove("hiddenContentTransition");
    containerTransactions.classList.remove("hiddenContentTransition");
    navClients.classList.remove("showContentTransition");
    navAccounts.classList.remove("showContentTransition");
    navTransactions.classList.remove("showContentTransition");

    navBarContainer.classList.add("hiddenNavBar");
    nav.classList.add("hiddenContent");
    containerWelcome.classList.remove("hiddenContent");
    containerClients.classList.add("hiddenContent");
    containerAccounts.classList.add("hiddenContent");
    containerTransactions.classList.add("hiddenContent");
    navClients.classList.remove("hiddenContent");
    navAccounts.classList.remove("hiddenContent");
    navTransactions.classList.remove("hiddenContent");
  }, 500);
});

navClients.addEventListener("click", (event) => {
  navAccounts.classList.add("showContentTransition");
  navTransactions.classList.add("showContentTransition");
  containerClients.classList.add("showContentTransition");
  containerAccounts.classList.add("hiddenContentTransition");
  containerTransactions.classList.add("hiddenContentTransition");

  setTimeout(() => {
    navAccounts.classList.remove("showContentTransition");
    navTransactions.classList.remove("showContentTransition");
    containerClients.classList.remove("showContentTransition");
    containerAccounts.classList.remove("hiddenContentTransition");
    containerTransactions.classList.remove("hiddenContentTransition");

    navAccounts.classList.remove("hiddenContent");
    navTransactions.classList.remove("hiddenContent");
    containerClients.classList.remove("hiddenContent");
    containerAccounts.classList.add("hiddenContent");
    containerTransactions.classList.add("hiddenContent");
  }, 500);
});

navAccounts.addEventListener("click", (event) => {
  navClients.classList.add("showContentTransition");
  navTransactions.classList.add("showContentTransition");
  containerClients.classList.add("hiddenContentTransition");
  containerAccounts.classList.add("showContentTransition");
  containerTransactions.classList.add("hiddenContentTransition");

  setTimeout(() => {}, 500);
  navClients.classList.remove("showContentTransition");
  navTransactions.classList.remove("showContentTransition");
  containerClients.classList.remove("hiddenContentTransition");
  containerAccounts.classList.remove("showContentTransition");
  containerTransactions.classList.remove("hiddenContentTransition");

  navClients.classList.remove("hiddenContent");
  navTransactions.classList.remove("hiddenContent");
  containerClients.classList.add("hiddenContent");
  containerAccounts.classList.remove("hiddenContent");
  containerTransactions.classList.add("hiddenContent");
});

navTransactions.addEventListener("click", (event) => {
  navClients.classList.add("showContentTransition");
  navAccounts.classList.add("showContentTransition");
  containerClients.classList.add("hiddenContentTransition");
  containerAccounts.classList.add("hiddenContentTransition");
  containerTransactions.classList.add("showContentTransition");
  clientName.classList.add("hiddenContentTransition");
  selectClientName.classList.add("showContentTransition");

  setTimeout(() => {
    navClients.classList.remove("showContentTransition");
    navAccounts.classList.remove("showContentTransition");
    containerClients.classList.remove("hiddenContentTransition");
    containerAccounts.classList.remove("hiddenContentTransition");
    containerTransactions.classList.remove("showContentTransition");
    clientName.classList.remove("hiddenContentTransition");
    selectClientName.classList.remove("showContentTransition");

    navClients.classList.remove("hiddenContent");
    navAccounts.classList.remove("hiddenContent");
    containerClients.classList.add("hiddenContent");
    containerAccounts.classList.add("hiddenContent");
    containerTransactions.classList.remove("hiddenContent");
    clientName.classList.add("hiddenContent");
    selectClientName.classList.remove("hiddenContent");
  }, 500);
});
