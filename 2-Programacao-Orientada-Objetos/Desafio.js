class ContaBancaria {
  #titular;
  #saldo;

  constructor(titular, saldo = 0) {
    this.#titular = titular;
    this.#saldo = saldo;
  }

  get saldo() {
    // return (this.#saldo = "Saldo inacessível!");
    return this.#saldo.toFixed(2);
  }

  set dinheiro(valor) {
    this.#saldo = valor;
  }

  depositar(valor) {
    if (valor <= 0) {
      console.log("Erro: valor da transação deve ser positivo.");
      return;
    }
    this.#saldo += valor;
    console.log(`Depósito de R$${valor}. Saldo: R$${this.#saldo}`);
  }

  sacar(valor) {
    if (valor <= 0) {
      console.log("Erro: valor da transação deve ser positivo.");
      return;
    }
    if (valor > this.#saldo) {
      console.log("Saldo insuficiente!");
      return;
    }
    console.log(`Saque de R$${valor}. Saldo: R$${this.#saldo}`);
  }

  exibirExtrato() {
    console.log(`Titular: ${this.#titular} | Saldo: R$${this.#saldo}`);
  }
}

const contaCarla = new ContaBancaria("Carla Beatriz", 1000);
console.log(contaCarla);

contaCarla.exibirExtrato();

contaCarla.depositar(500);

contaCarla.sacar(200);

contaCarla.sacar(5000);

contaCarla.depositar(-100);

contaCarla.sacar(-100);

contaCarla.exibirExtrato();
console.log(contaCarla);

console.log(contaCarla.saldo);

contaCarla.saldo = 9999999;  // ! se não tivesse o get saldo(), seria acrescentado um novo atributo público, mas com o get saldo(), a tentativa de alteração é ignorada
console.log(contaCarla.saldo);
console.log(contaCarla);

contaCarla.dinheiro = 9999999;
console.log(contaCarla.saldo);
