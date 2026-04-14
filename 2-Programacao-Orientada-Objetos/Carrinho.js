class Produto {
  constructor(nome = "Sem nome", preco = 0) {
    this.nome = nome;
    this.preco = preco;
  }
}

class CarrinhoDeCompras {
  constructor() {
    this.itens = [];
  }

  adicionarItem(produto, quantidade = 1) {
    this.itens.push({ produto, quantidade });
    console.log(`${produto.nome} (x${quantidade}) adicionado ao carrinho.`);
  }

  removerItem(nomeProduto) {
    const tamanhoAntes = this.itens.length;
    this.itens = this.itens.filter(item => item.produto.nome !== nomeProduto);
    if (this.itens.length < tamanhoAntes) {
      console.log(`${nomeProduto} removido.`);
    } else {
      console.log(`${nomeProduto} não encontrado.`);
    }
  }

  calcularTotal() {
    return this.itens.reduce((total, item) => {
      return total + (item.produto.preco * item.quantidade);
    }, 0);
  }

  exibirResumo() {
    console.log("========= CARRINHO =========");
    if (this.itens.length === 0) {
      console.log("Carrinho vazio.");
      return;
    }
    this.itens.forEach(item => {
      const subtotal = item.produto.preco * item.quantidade;
      console.log(`${item.produto.nome} x${item.quantidade} = R$${subtotal.toFixed(2)}`);
    });
    console.log(`============================`);
    console.log(`TOTAL: R$${this.calcularTotal().toFixed(2)}`);
  }
}
const notebook = new Produto("Notebook", 3500);
const mouse = new Produto("Mouse", 89.90);
const teclado = new Produto("Teclado", 159.90);

const carrinho = new CarrinhoDeCompras();

carrinho.adicionarItem(notebook);
// "Notebook (x1) adicionado ao carrinho."

carrinho.adicionarItem(mouse, 2);
// "Mouse (x2) adicionado ao carrinho."

carrinho.adicionarItem(teclado);
// "Teclado (x1) adicionado ao carrinho."

carrinho.exibirResumo();
// ========= CARRINHO =========
// Notebook x1 = R$3500.00
// Mouse x2 = R$179.80
// Teclado x1 = R$159.90
// ============================
// TOTAL: R$3839.70

carrinho.removerItem("Mouse");
console.log(`Novo total: R$${carrinho.calcularTotal().toFixed(2)}`);
// "Novo total: R$3659.90"