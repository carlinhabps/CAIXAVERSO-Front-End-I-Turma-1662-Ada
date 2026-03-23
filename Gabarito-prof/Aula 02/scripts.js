function botaoClicado() {
  console.log("Botão foi clicado");
}

const botaoSalvar = document.querySelector("#salvar");
console.log(botaoSalvar);
// botaoSalvar.onclick = () => {
//   event.preventDefault();
//   console.log("clicou");
//   console.log(inputNome.value);
// };

// const inputNome = document.querySelector("#nome");
// inputNome.onblur = () => console.log("input perdeu o foco");

// inputNome.addEventListener("input", () => {
//   const value = inputNome.value;
//   //   console.log(value);

//   if (value.length >= 3) {
//     filtraNomes(value);
//   }
//   //   console.log(typeof value);
// });

// console.log(inputNome.value);

// function filtraNomes(value) {
//   // TO DO - Implementar depois
//   console.log(value);
// }

// const inputCpf = document.querySelector("#cpf");
// inputCpf.addEventListener("blur", (event) => {
//   console.log(event);
//   console.log("Input perdeu o foco");
// });

// inputCpf.addEventListener("keydown", (event) => {
//   console.log(event.key);
// });

// const paragrafo = document.querySelector("#paragrafo");

// inputCpf.addEventListener("keydown", (event) => {
//   console.log(event.key);

//   //   Se pressionou ctrl, pressupõe-se que vai executar algum comando
//   if (event.key === "Control" && event.key === "c") {
//     localStorage.setItem("key", event.key);
//   } else {
//     localStorage.removeItem("key");
//   }

//   //   const contro;

//   if (event.key === "c") {
//     alert("Não é permitido copiar da tela!");
//   }
// });

const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.querySelector("#nome").value;
  const cpf = document.querySelector("#cpf").value;

  if (nome === "" || cpf === "") {
    alert("Alguns dos campos obrigatórios não foram preenchidos!");
    return;
  }

  console.log("Formulário válido:", { nome, cpf });
});
