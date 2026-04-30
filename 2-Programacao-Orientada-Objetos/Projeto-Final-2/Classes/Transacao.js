class Transacao {
  #tipo;
  #valor;
  #data;
  #descricao;

  constructor(tipo, valor, descricao = tipo) {
    this.#tipo = tipo;
    this.#valor = valor;
    this.#data = new Date();
    this.#descricao = descricao;
    Object.freeze(this);
  }

  get tipo() {
    return String(this.#tipo).toUpperCase();
  }

  get valor() {
    if (this.tipo === "DEPÓSITO" || this.tipo === "RENDIMENTO") {
      return `${Conta.formatarMoeda(this.#valor)} C`;
    }
    if (this.tipo === "SAQUE" || this.tipo === "TRANSFERÊNCIA") {
      return `- ${Conta.formatarMoeda(this.#valor)} D`;
    }
  }

  get data() {
    return this.#data.toLocaleDateString("pt-BR");
  }

  get descricao() {
    return String(this.#descricao).toUpperCase();
  }

  exibir() {
    return `${this.data}  |  ${this.tipo}  |  ${this.valor}  |  ${this.descricao}`;
  }
}

// const acc = new Transacao("depósito", 500);
// console.log(acc.exibir());
// const acc1 = new Transacao("transferência", 968);
// console.log(acc1.exibir());
// const acc2 = new Transacao("saque", 4654, "brusinhas");
// console.log(acc2.exibir());
// const acc3 = new Transacao("rendimento", 65, "poupança");
// console.log(acc3.exibir());
