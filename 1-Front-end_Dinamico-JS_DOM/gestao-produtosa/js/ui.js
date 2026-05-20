async function exibirProdutos() {
  try {
    const resposta = await obterProdutosService();
    renderizaProdutos(resposta);
  } catch (error) {
    console.log(error);
  }
}

function renderizaProdutos(produtos) {
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
