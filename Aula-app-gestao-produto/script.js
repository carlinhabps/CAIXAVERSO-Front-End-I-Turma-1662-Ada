const doc = (selector) => document.querySelector(selector);

const form = doc("#form-produto");
const campoProduto = doc("#nome");
const campoPreco = doc("#preco");
const campoCategoria = doc("#categoria");

const produtos = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const produto = campoProduto.value;
  const preco = campoPreco.value;
  const categoria = campoCategoria.value;

  if (produto === "" || preco === "" || categoria === "") {
    alert("Há campo obrigatório não respondido!");

    return;
  }

  salvarProduto({ produto, preco, categoria });

  // campoProduto.value = "";
  // campoPreco.value = "";
  // campoCategoria.value = "";
  form.reset(); // mesmo que escrever as 3 linhas anteriores
});

function salvarProduto(novoProduto) {
  produtos.push(novoProduto);
  console.log(novoProduto);
}

function exibirProdutos() {
  produtos.forEach((produto) => {});
}

  // <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
  //   <div class="card">
  //     <div class="card-body">
  //       <h5 class="card-title">Nome Produto</h5>
  //       <p class="card-text">1000</p>
  //       <p class="card-text">Categoria</p>

  //       <div class="d-flex gap-2">
  //         <button type="button" class="btn btn-outline-primary">
  //           Editar
  //         </button>
  //         <button type="button" class="btn btn-outline-danger">
  //           Excluir
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // </div>;
