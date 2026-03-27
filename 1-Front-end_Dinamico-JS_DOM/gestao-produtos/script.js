const form = document.querySelector("#form-produto");
const campoNome = document.querySelector("#nome");
const campoPreco = document.querySelector("#preco");
const campoCategoria = document.querySelector("#categoria");
const campoId = document.querySelector("#id");
const botaoSalvar = document.querySelector("#salvar");

const produtos = [
  {
    id: new Date().getTime(),
    nome: "Teste",
    preco: 1,
    categoria: "Alimentos",
  },
];

exibirProdutos();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const action = event.target.dataset.action;

  const nome = campoNome.value;
  const preco = campoPreco.value;
  const categoria = campoCategoria.value;
  const id = campoId.value;

  if (nome === "" || preco === "" || categoria === "") {
    alert("Alguns campos obrigatórios não foram preenchidos");
    return;
  }

  if (action === "editar") {
    editarProduto({ id, nome, preco, categoria });
  } else {
    salvarProduto({ nome, preco, categoria });
  }
});

function salvarProduto(produto) {
  produto.id = new Date().getTime();
  produtos.push(produto);
  form.reset();
  exibirProdutos();
}

function preencheFormularioEdicao(event) {
  const id = event.target.dataset.id;
  const produto = produtos.find((p) => p.id == id);
  campoNome.value = produto.nome;
  campoPreco.value = produto.preco;
  campoCategoria.value = produto.categoria;
  campoId.value = produto.id;
  form.setAttribute("data-action", "editar");
}

function editarProduto(produto) {
  const id = produto.id;
  const index = produtos.findIndex((p) => p.id == id);

  produtos[index] = produto;
  // produtos[index].nome = produto.nome;
  // produtos[index].preco = Number(produto.preco);
  // produtos[index].categoria = produto.categoria;
  produtos[index].id = Number(produto.id);
  form.reset();
  exibirProdutos();
  form.setAttribute("data-action", "salvar");

  console.log(produto);
}

function excluirProduto(event) {
  const result = confirm("Deseja mesmo excluir o produto?");

  if (result) {
    const id = event.target.dataset.id;
    const index = produtos.findIndex((p) => p.id == id);
    produtos.splice(index, 1);
    exibirProdutos();
  }
}

function exibirProdutos() {
  const listaProdutos = document.querySelector("#lista-produtos");
  listaProdutos.innerHTML = "";
  produtos.forEach((produto) => {
    const divCol = criaElemento(
      "div",
      "col-12 col-sm-6 col-md-4 col-lg-3 mb-3",
    );
    const divCard = criaElemento("div", "card");
    const divCardBody = criaElemento("div", "card-body");

    const h5 = criaElemento("h5", "card-title");
    h5.innerText = produto.nome;

    const paragrafoPreco = criaElemento("p", "card-text");
    paragrafoPreco.innerText = produto.preco;

    const paragrafoCategoria = criaElemento("p", "card-text");
    paragrafoCategoria.innerText = produto.categoria;

    const divBotoes = criaElemento("div", "d-flex gap-2");

    const botaoEditar = criaElemento("button", "btn btn-primary");
    botaoEditar.innerText = "Editar";
    botaoEditar.setAttribute("data-id", produto.id);
    botaoEditar.addEventListener("click", preencheFormularioEdicao);

    const botaoExcluir = criaElemento("button", "btn btn-danger");
    botaoExcluir.innerText = "Excluir";
    botaoExcluir.setAttribute("data-id", produto.id);
    botaoExcluir.addEventListener("click", excluirProduto);

    divCardBody.append(h5, paragrafoPreco, paragrafoCategoria, divBotoes);
    divBotoes.append(botaoEditar, botaoExcluir);
    divCard.appendChild(divCardBody);
    divCol.appendChild(divCard);
    listaProdutos.appendChild(divCol);
  });
}

// Cria dinamicamente o elemento, adiciona as classes e retorna o elemento criado
function criaElemento(elemento, classes) {
  const novoElemento = document.createElement(elemento);
  novoElemento.classList.add(...classes.split(" "));
  //   classes.split(" ").forEach((classe) => novoElemento.classList.add(classe));
  return novoElemento;
}
