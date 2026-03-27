const form = document.querySelector("#form-produto");
const campoNome = document.querySelector("#nome");
const campoPreco = document.querySelector("#preco");
const campoCategoria = document.querySelector("#categoria");
const campoId = document.querySelector("#id");
const botaoSalvar = document.querySelector("#salvar");

exibirProdutos();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const action = event.target.dataset.action;

  const nome = campoNome.value;
  const preco = Number(campoPreco.value);
  const categoria = campoCategoria.value;
  const id = Number(campoId.value);

  if (!validarProduto(nome, preco, categoria)) {
    return;
  }

  if (action === "editar") {
    editarProduto({ id, nome, preco, categoria });
  } else {
    salvarProduto({ nome, preco, categoria });
  }
});

async function salvarProduto(produto) {
  try {
    await cadastrarProdutoService(produto);
    form.reset();
    exibirProdutos();
  } catch (error) {
    console.log(error);
  }
}

function preencheFormularioEdicao(event) {
  const id = event.target.dataset.id;
  obterProdutoPeloIdService(id)
    .then((resposta) => {
      campoNome.value = resposta.nome;
      campoPreco.value = resposta.preco;
      campoCategoria.value = resposta.categoria;
      campoId.value = resposta.id;
      form.setAttribute("data-action", "editar");
    })
    .catch((erro) => {
      console.log(erro);
    });
}

function editarProduto(produtoEditado) {
  editarProdutoService(produtoEditado)
    .then(() => {
      form.setAttribute("data-action", "salvar");
      form.reset();
      exibirProdutos();
    })
    .catch((erro) => {
      console.log(erro);
    });
}

function excluirProduto(event) {
  const result = confirm("Deseja mesmo excluir o produto?");
  if (result) {
    const id = event.target.dataset.id;
    excluirProdutoService(id)
      .then((resposta) => {
        console.log(resposta);
        exibirProdutos();
      })
      .catch((erro) => {
        console.log(erro);
      });
  }
}
