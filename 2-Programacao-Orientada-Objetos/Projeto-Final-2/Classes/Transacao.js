// ! Representa uma movimentação bancária (imutável — uma vez criada, não pode ser alterada (registro de auditoria))
// ?   Atributos privados
// * #tipo (string): "deposito", "saque", "transferencia" ou "rendimento"
// // * #valor (number)
// // * #data (Date): preenchida automaticamente com new Date()
// // * #descricao (string): opcional
// ?   Métodos e getters
// // * Apenas getters para todos os atributos (sem setters — imutabilidade)
// // * exibir(): retorna string formatada com data, tipo, valor e descrição. Usar sinal '-' para saídas (saque, transferência enviada) e '+' para entradas (depósito, rendimento)

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
      return `${this.#valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} C`;
    }
    if (this.tipo === "SAQUE" || this.tipo === "TRANSFERÊNCIA") {
      return `- ${this.#valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} D`;
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
