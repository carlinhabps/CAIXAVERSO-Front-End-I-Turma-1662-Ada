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

  constructor(numeroConta, nomeTitular, cpf, saldoInicial, limite = 500) {
    super(numeroConta, nomeTitular, cpf, saldoInicial);
    this.#limiteChequeEspecial = limite;
  }

  get limiteChequeEspecial() {
    return Conta.formataMoeda(this.#limiteChequeEspecial);
  }

  get saldoDisponivelNumerico() {
    return this.#limiteChequeEspecial + super.saldoNumerico;
  }

  get saldoDisponivel() {
    return Conta.formataMoeda(this.saldoDisponivelNumerico);
  }

  sacar(valor, descricao = "saque") {
    if (valor > this.saldoDisponivelNumerico) {
      throw new Error(
        `Operação não realizada! Saldo insuficiente para realizar a transação. Seu saldo atual, com limite, é de ${this.saldoDisponivel}.`,
      );
      return console.log(Error);
    } else {
      super.sacar(valor, descricao);
    }
  }

  exibirDadosCOnta() {
    console.log(`${super.titular} | CPF: ${super.cpf}`);
    console.log(
      `Conta número ${super.numeroConta} | Saldo: ${super.saldo} | Limite: ${this.limiteChequeEspecial} | Saldo com Limite: ${this.saldoDisponivel}`,
    );
  }
}

const acc = new ContaCorrente(236985, "Carla", 23698547, 200);
