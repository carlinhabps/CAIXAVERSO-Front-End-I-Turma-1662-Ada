// ! Gerencia a coleção de contas do banco
// ?   Atributos
// // * static #contadorConta = 1000 (contador estático compartilhado para gerar números únicos)
// // * #nome (string)
// // * #contas (array de Conta)
// ?   Métodos
// // * abrirContaCorrente(titular, cpf, depositoInicial, limite): incrementar contador, criar ContaCorrente, adicionar ao array, retornar a conta
// // * abrirContaPoupanca(titular, cpf, depositoInicial, taxa): análogo, mas cria ContaPoupanca
// // * encerrarConta(numero): buscar a conta. Se saldo > 0, lançar erro (dinheiro sumiria). Remover do array
// // * buscarPorNumero(numero): retornar a conta ou undefined
// // * buscarPorCpf(cpf): retornar array de contas (uma pessoa pode ter várias). Normalizar o CPF antes de comparar
// // * static formatarMoeda(valor): retorna string no formato "R$ 1.234,56" (opcional, mas recomendado)
// ?   Getters
// // * nome
// // * todasContas: retornar cópia do array
// // * totalContas: quantidade de contas
// // * saldoTotal (getter computado): soma de todos os saldos (usar reduce)

class Banco {
  static #contadorConta = 1000;
  #nomeBanco;
  #contas = [];

  constructor(nomeBanco) {
    this.#nomeBanco = nomeBanco;
  }

  get nomeBanco() {
    return this.#nomeBanco;
  }

  get contas() {
    return [...this.#contas];
  }

  get totalContas() {
    return this.#contas.length;
  }

  get saldoTotal() {
    return this.#contas.reduce((acc, conta) => acc + conta.saldo, 0);
  }

  abrirContaCorrente(titular, cpf, depositoInicial = 0, limite = 500) {
    const numConta = Banco.#contadorConta++;
    const novaCC = new ContaCorrente(
      numConta,
      titular,
      cpf,
      depositoInicial,
      limite,
    );
    this.#contas.push(novaCC);
    return novaCC;
  }

  abrirContaPoupanca(
    titular,
    cpf,
    depositoInicial = 0,
    taxaRendimento = 0.005,
  ) {
    const numConta = Banco.#contadorConta++;
    const novaCP = new ContaPoupanca(
      numConta,
      titular,
      cpf,
      depositoInicial,
      taxaRendimento,
    );
    this.#contas.push(novaCP);
    return novaCP;
  }

  buscarPorNumero(numero) {
    return this.#contas.find((conta) => conta.numeroConta === numeroConta);
  }

  buscarPorCpf(cpf) {
    const cpfCompleto = String(this.#cpf).padStart(11, "0");
    const cpfFormatado = cpfCompleto.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4",
    );
    return this.#contas.filter((conta) => conta.cpf === cpfFormatado);
  }

  encerrarConta(numeroConta) {
    const conta = this.buscarPorNumero(numeroConta);

    if (!conta) {
      throw new Error("Operação não realizada! Conta informada é inexistente.");
      return console.log(Error);
    }

    if (!conta.saldo === 0) {
      throw new Error(
        "Operação não realizada! O saldo da conta não está zerado.",
      );
      return console.log(Error);
    }

    this.#contas = this.#contas.filter(
      (conta) => conta.numeroConta !== numeroConta,
    );
    console.log(
      `Operação realizada com sucesso! A conta número ${numeroConta} foi removida da base de dados.`,
    );
  }
}
