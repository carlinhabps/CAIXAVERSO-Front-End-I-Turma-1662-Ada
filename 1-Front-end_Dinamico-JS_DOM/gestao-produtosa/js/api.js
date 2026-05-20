async function obterProdutosService() {
  const resposta = await fetch("http://localhost:3000/produtos");
  return await resposta.json();
}

function obterProdutoPeloIdService(id) {
  return fetch(`http://localhost:3000/produtos/${id}`).then((resposta) =>
    resposta.json(),
  );
}

async function cadastrarProdutoService(produto) {
  const resposta = await fetch("http://localhost:3000/produtos", {
    method: "POST",
    body: JSON.stringify(produto),
  });
  return await resposta.json();
}

function editarProdutoService(produto) {
  return fetch(`http://localhost:3000/produtos/${produto.id}`, {
    method: "PUT",
    body: JSON.stringify(produto),
  }).then((resposta) => resposta.json());
}

function excluirProdutoService(id) {
  return fetch(`http://localhost:3000/produtos/${id}`, {
    method: "DELETE",
  }).then((resposta) => resposta.json());
}
