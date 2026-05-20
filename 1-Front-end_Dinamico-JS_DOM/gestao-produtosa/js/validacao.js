function validarProduto(nome, preco, categoria) {
  if (nome === "" || preco === "" || categoria === "") {
    alert("Alguns campos obrigatórios não foram preenchidos");
    return false;
  }

  return true;
}
