const paragrafo = document.querySelector("#paragrafo");

paragrafo.addEventListener("copy", (event) => {
  event.preventDefault();
  console.log("Tentativa de cópia bloqueada");
});

paragrafo.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  console.log("Menu de contexto bloqueado");
});
