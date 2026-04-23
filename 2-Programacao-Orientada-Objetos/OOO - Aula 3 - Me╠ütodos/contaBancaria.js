class ContaBancaria {
  constructor(titular, saldo = 0) {
    this.titular = titular;
    this.saldo = saldo;
  }

  depositar(valor) {
    // if (valor <= 0) {
    //   console.log("Erro: valor deve ser positivo.");
    //   return undefined;
    // }
    this.saldo += valor;
    console.log(`Depósito de R$${valor.toFixed(2)}. Saldo: R$${this.saldo.toFixed(2)}`);
  }

  sacar(valor) {
    if (valor <= 0) {
      console.log("Erro: valor deve ser positivo.");
      return;
    }
    if (valor > this.saldo) {
      console.log("Saldo insuficiente!");
      return;
    }
    this.saldo -= valor;
    console.log(`Saque de R$${valor.toFixed(2)}. Saldo: R$${this.saldo.toFixed(2)}`);
  }

  exibirExtrato() {
    console.log(`Titular: ${this.titular} | Saldo: R$${this.saldo.toFixed(2)}`);
  }
}