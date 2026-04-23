class Banco {
  // ! Gerencia a coleção de contas do banco
  // ?   Atributos
  // * static #contadorConta = 1000 (contador estático compartilhado para gerar números únicos)
  // * #nome (string)
  // * #contas (array de Conta)
  // ?   Métodos
  // * abrirContaCorrente(titular, cpf, depositoInicial, limite): incrementar contador, criar ContaCorrente, adicionar ao array, retornar a conta
  // * abrirContaPoupanca(titular, cpf, depositoInicial, taxa): análogo, mas cria ContaPoupanca
  // * encerrarConta(numero): buscar a conta. Se saldo > 0, lançar erro (dinheiro sumiria). Remover do array
  // * buscarPorNumero(numero): retornar a conta ou undefined
  // * buscarPorCpf(cpf): retornar array de contas (uma pessoa pode ter várias). Normalizar o CPF antes de comparar
  // * static formatarMoeda(valor): retorna string no formato "R$ 1.234,56" (opcional, mas recomendado)
  // ?   Getters
  // * nome
  // * todasContas: retornar cópia do array
  // * totalContas: quantidade de contas
  // * saldoTotal (getter computado): soma de todos os saldos (usar reduce)
}
