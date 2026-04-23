class ContaCorrente {
  // ! Herda de Conta. Adiciona limite de cheque especial. Usar extends Conta.
  // ?   Novo atributo privado
  // * #limiteChequeEspecial (number): padrão 500
  // ?   Constructor
  // * Recebe: número, titular, CPF, depósito inicial e limite (opcional). Chamar super() com os parâmetros da classe pai
  // ?   Novos membros
  // * Getter limiteChequeEspecial
  // * Getter computado saldoDisponivel: retorna saldo + limiteChequeEspecial
  // ?   Sobrescrita de método
  // * sacar(valor, descricao): permitir saque até saldo + limiteChequeEspecial. Se passar, lançar erro
}
