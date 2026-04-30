// ! Herda de Conta. Adiciona rendimento mensal. Usar extends Conta.
// ?   Novo atributo privado
// // * #taxaRendimento (number): padrão 0.005 (equivale a 0,5% ao mês)
// ?   Constructor
// // * Recebe: número, titular, CPF, depósito inicial e taxa (opcional). Chamar super() com os parâmetros da classe pai
// ?   Novos membros
// // * Getter taxaRendimento
// // * Método aplicarRendimento(): calcular saldo × taxaRendimento, somar ao saldo e registrar Transacao do tipo "rendimento"
// ?   Sobrescrita de método
// // * sacar(valor, descricao): não permitir saque maior

class ContaPoupanca extends Conta {
  #taxaRendimento;

  constructor(
    numeroConta,
    nomeTitular,
    cpf,
    saldoInicial,
    taxaRendimento = 0.005,
  ) {
    super(numeroConta, nomeTitular, cpf, saldoInicial);
    this.#taxaRendimento = taxaRendimento;
  }

  get taxaRendimento() {
    return this.#taxaRendimento;
  }

  aplicarRendimento() {
    const rendimento = super.saldoNumerico * this.#taxaRendimento;
    this.depositar(rendimento, "rendimento");
  }

  sacar(valor, descricao = "saque") {
    if (valor > super.saldoNumerico) {
      throw new Error(
        `Operação não realizada! Saldo insuficiente para realizar a transação. Seu saldo atual é de ${super.saldo}.`,
      );
      return console.log(Error);
    } else {
      super.sacar(valor, descricao);
    }
  }
}

const acc1 = new ContaPoupanca(236985, "Carla", 23698547, 100);

acc1.exibirExtrato();
acc1.aplicarRendimento();
acc1.exibirExtrato();
acc1.sacar(50000);
