// ! Herda de Conta. Adiciona limite de cheque especial. Usar extends Conta.
// ?   Novo atributo privado
// // * #limiteChequeEspecial (number): padrão 500
// ?   Constructor
// // * Recebe: número, titular, CPF, depósito inicial e limite (opcional). Chamar super() com os parâmetros da classe pai
// ?   Novos membros
// // * Getter limiteChequeEspecial
// // * Getter computado saldoDisponivel: retorna saldo + limiteChequeEspecial
// ?   Sobrescrita de método
// // * sacar(valor, descricao): permitir saque até saldo + limiteChequeEspecial. Se passar, lançar erro

class ContaCorrente extends Conta {
  #limiteChequeEspecial;

  constructor(numeroConta, nomeTitular, cpf, depositoInicial, limite = 500) {
    super(numeroConta, nomeTitular, cpf, depositoInicial);
    this.#limiteChequeEspecial = limite;
  }

  get limiteChequeEspecial() {
    return Conta.formatarMoeda(this.#limiteChequeEspecial);
  }

  get saldoDisponivel() {
    return this.#limiteChequeEspecial + super.saldo;
  }

  get saldoDisponivelFormatado() {
    return Conta.formatarMoeda(this.saldoDisponivel);
  }

  sacar(valor, descricao = "saque") {
    if (valor > this.saldoDisponivel) {
      throw new Error(
        `Operação não realizada! Saldo insuficiente para realizar a transação. Seu saldo atual, com limite, é de ${this.saldoDisponivelFormatado}.`,
      );
      return console.log(Error);
    } else {
      super.sacar(valor, descricao);
    }
  }

  exibirDadosCOnta() {
    console.log(`${super.titular} | CPF: ${super.cpf}`);
    console.log(
      `Conta número ${super.numeroConta} | Saldo: ${super.saldoFormatado} | Limite: ${this.limiteChequeEspecial} | Saldo com Limite: ${this.saldoDisponivelFormatado}`,
    );
  }
}

const acc = new ContaCorrente(236985, "Carla", 23698547, 200);
