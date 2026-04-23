class Conta {
  // ! Classe base com atributos e métodos comuns a qualquer tipo de conta - Não deve ser instanciada diretamente — apenas ContaCorrente e ContaPoupanca.
  // ?   Atributos privados
  // * #numero (number): número único da conta
  // * #titular (string)
  // * #cpf (string): armazenado apenas com os 11 dígitos
  // * #saldo (number)
  // * #transacoes (array de Transacao)
  // ?   Constructor
  // * Recebe: número, titular, CPF e depósito inicial (opcional, padrão 0)
  // * Se houver depósito inicial, deve chamar this.depositar() automaticamente para que a transação seja registrada
  // ?   Getters
  // * numero (somente leitura — sem setter)
  // * titular
  // * cpf
  // * saldo (somente leitura — sem setter; alterações só via métodos)
  // * transacoes: retornar cópia do array com spread [...#transacoes]
  // * totalTransacoes (getter computado): quantidade de transações
  // ?   Setters com validação
  // * titular: rejeitar string vazia ou só espaços. Armazenar com .trim()
  // * cpf: normalizar removendo pontos/traços/espaços. Validar que tem exatamente 11 dígitos após normalização
  // ?   Métodos
  // * depositar(valor, descricao): validar número positivo. Somar ao saldo e registrar Transacao
  // * sacar(valor, descricao): validação básica. SERÁ SOBRESCRITO nas subclasses
  // * transferir(valor, contaDestino): verificar com instanceof que destino é uma Conta e que não é a mesma. Reutilizar sacar() e depositar()
  // * exibirExtrato(): imprimir no console histórico completo e saldo atual
}
