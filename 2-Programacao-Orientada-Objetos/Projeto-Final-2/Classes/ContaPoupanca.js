class ContaPoupanca extends Conta {
  #taxaRendimento;

  constructor(
    numeroConta,
    nomeTitular,
    cpf,
    depositoInicial,
    taxaRendimento = 0.005,
  ) {
    super(numeroConta, nomeTitular, cpf, depositoInicial);
    this.#taxaRendimento = taxaRendimento;
  }

  get taxaRendimento() {
    return this.#taxaRendimento;
  }

  aplicarRendimento() {
    const rendimento = super.saldo * this.#taxaRendimento;
    this.depositar(rendimento, "rendimento");
  }

  sacar(valor, descricao = "saque") {
    if (valor > super.saldo) {
      throw new Error(
        `Operação não realizada! Saldo insuficiente para realizar a transação. O saldo atualda conta ${super.numeroContaFormatado} é de ${super.saldoFormatado}.`,
      );
      return console.log(Error);
    } else {
      super.sacar(valor, descricao);
    }
  }

  exibirDadosConta() {
    console.log(`${super.titular} | CPF: ${super.cpf}`);
    console.log(
      `Conta Poupança número ${super.numeroContaFormatado} | Saldo: ${super.saldoFormatado}`,
    );
  }
}

// const acc1 = new ContaPoupanca(236985, "Carla", 23698547, 100);

// acc1.exibirExtrato();
// acc1.aplicarRendimento();
// acc1.exibirExtrato();
// acc1.sacar(50000);
