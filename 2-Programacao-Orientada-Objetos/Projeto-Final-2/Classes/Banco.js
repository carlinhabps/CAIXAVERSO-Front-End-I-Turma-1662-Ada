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

  buscarPorNumero(numeroConta) {
    return this.#contas.find((conta) => conta.numeroConta === numeroConta);
  }

  buscarPorCpf(cpf) {
    const cpfCompleto = String(cpf).padStart(11, "0");
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
      `Operação realizada com sucesso! A conta número ${Conta.formatarNumeroConta(numeroConta)} foi removida da base de dados.`,
    );
  }
}

// ! ======================================== TESTES ======================================== //

// ! ==================== 6.1. Criação do banco e contas

const cx = new Banco("CAIXA");

const cc = cx.abrirContaCorrente("Ana Silva", "000.123.456-00", 1000);

const cp = cx.abrirContaPoupanca("Ana Silva", "000.123.456-00", 500);

// console.log(cx.buscarPorCpf("000.123.456-00"));
// console.log(cx.buscarPorCpf("000.123.456-00").length);

// ! ==================== 6.2. Operações básicas

cc.depositar(500);
cc.sacar(200);
// cc.exibirExtrato();

// ! ==================== 6.3. Polimorfismo do sacar()

cc.sacar(1500);
// cc.exibirExtrato();

// cp.sacar(1500);
// cp.exibirExtrato();

// ! ==================== 6.4. Rendimento da poupança

cp.aplicarRendimento();
// cp.exibirExtrato();

// ! ==================== 6.5. Transferência

cc.transferir(100, cp);
cc.exibirExtrato();
cp.exibirExtrato();

// ! ==================== 6.6. Validações

try {
  cc.depositar(-50);
} catch (e) {
  console.log(e.message);
}
try {
  cc.cpf = "123";
} catch (e) {
  console.log(e.message);
}
try {
  cc.cpf = "123456789123";
} catch (e) {
  console.log(e.message);
}
try {
  cc.titular = "";
} catch (e) {
  console.log(e.message);
}
try {
  cc.transferir(10, cc); //! VER PQ NÃO TÁ DANDO O ERRO
} catch (e) {
  console.log(e.message);
}

// cc.exibirExtrato();
// cp.exibirExtrato();

// ! ==================== 6.7. Encapsulamento

cc.saldo = 99999999;
cp.saldo = 99999999;

cc.exibirExtrato();
cp.exibirExtrato();

// ! ==================== 6.8. Getters do banco

console.log(cx.totalContas);
console.log(cx.saldoTotal);

// ! ==================== 6.9. Encerrar conta

// Não pode encerrar conta com saldo
try {
  cx.encerrarConta(cc.numero); //! VER PQ NÃO TÁ DANDO O ERRO
} catch (e) {
  console.log(e.message);
}
// Zerar e encerrar
cc.sacar(cc.saldo); // para contas com saldo positivo
cx.encerrarConta(cc.numero); // deve funcionar
