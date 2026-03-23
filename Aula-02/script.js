const paragrafo = document.querySelector("#paragrafo");

paragrafo.addEventListener("copy", (event) => {
  event.preventDefault();
  console.log("Tentativa de cópia bloqueada");
});

paragrafo.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  console.log("Menu de contexto bloqueado");
});

// ! Validando Formulário

const form = document.querySelector("#meu-form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // para o envio padrão

  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;

  if (nome === "" || email === "") {
    console.log("Campos obrigatórios!");
    return;
  }

  console.log("Formmulário válido:", { nome, email });
});

// ! DÚVIDA - não faltou algum comando de "enviar" pra fazer o submit funcionar?

//
//
//

const caixa = document.querySelector("#caixa");

// Adicionar classe
caixa.classList.add("ativo");

// Remover classe
caixa.classList.remove("ativo");

// Alternar classe
caixa.classList.toggle("ativo"); // ficou verde
caixa.classList.toggle("ativo"); // ficou azul
caixa.classList.toggle("ativo"); // ficou verde de novo



// Criar elemento
const novoParagrafo = document.createElement("p");

// Adicionar conteúdo
novoParagrafo.innerText = "Novo parágrafo";

// Adicionar à página
const container = document.querySelector("#container");

container.appendChild(novoParagrafo);
