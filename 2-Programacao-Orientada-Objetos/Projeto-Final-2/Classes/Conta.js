class Conta {
  #numeroConta;
  #titular;
  #cpf;
  #saldo;
  #transacoes;

  constructor(numeroConta, nomeTitular, cpf, depositoInicial = 0) {
    this.#numeroConta = numeroConta;
    this.titular = nomeTitular;
    this.cpf = cpf;
    this.#saldo = 0;
    this.#transacoes = [];

    if (depositoInicial > 0)
      this.depositar(depositoInicial, "Depósito na abertura da conta");

    if (depositoInicial < 0)
      console.log(
        "Saldo inicial inválido! Utilizado o valor de R$ 0,00 para abertura da conta.",
      );
  }

  set titular(nomeInformado) {
    const nome = nomeInformado.trim();

    if (nome === "") {
      throw new Error("Nome informado inválido.");
      return console.log(Error);
    } else {
      this.#titular = nome.toUpperCase();
    }
  }

  set cpf(cpfInformado) {
    const numCpf = String(cpfInformado).replace(/\D/g, "");
    if (numCpf.length > 11) {
      throw new Error("Número de CPF inválido.");
    }

    this.#cpf = numCpf;
  }

  get numeroConta() {
    return this.#numeroConta;
  }

  get numeroContaFormatado() {
    return Conta.formatarNumeroConta(this.#numeroConta);
  }

  get titular() {
    return this.#titular;
  }

  get cpf() {
    const cpfCompleto = String(this.#cpf).padStart(11, "0");
    const cpfFormatado = cpfCompleto.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4",
    );
    return cpfFormatado;
  }

  get saldoFormatado() {
    return Conta.formatarMoeda(this.#saldo);
  }

  get saldo() {
    return this.#saldo;
  }

  get transacoes() {
    return [...this.#transacoes];
  }

  get totalTransacoes() {
    return this.#transacoes.length;
  }

  static formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  static formatarNumeroConta(numeroConta) {
    const numConta = String(numeroConta).padStart(6, "0");
    const dv = Math.floor(Math.random() * 10);
    return `${numConta}-${dv}`;
  }

  depositar(valor, descricao = "depósito") {
    if (valor <= 0) {
      throw new Error("Informe um valor positivo para efetivar a transação.");
      return console.log(Error);
    }
    this.#saldo += valor;
    const novoDeposito = new Transacao("depósito", valor, descricao);
    this.#transacoes.push(novoDeposito);
    console.log(
      `Despósito de ${Conta.formatarMoeda(valor)} realizado com sucesso!`,
    );
  }

  sacar(valor, descricao = "saque") {
    if (valor <= 0) {
      throw new Error(
        `Operação não realizada! O valor da transação deve ser maior que zero.`,
      );
      return console.log(Error);
    }
    this.#saldo -= valor;
    const novoSaque = new Transacao("saque", valor, descricao);
    this.#transacoes.push(novoSaque);
        console.log(
      `Saque de ${Conta.formatarMoeda(valor)} realizado com sucesso!`,
    );
  }

  transferir(valor, contaDestino) {
    if (contaDestino.numeroConta === this.#numeroConta) {
      throw new Error(
        `Operação não realizada! A conta de destino informada é igua à conta de origem.`,
      );
      return console.log(Error);
    }

    if (!(contaDestino instanceof Conta)) {
      throw new Error(
        `Operação não realizada! Conta informada não reconhecida.`,
      );
      return console.log(Error);
    }

    this.sacar(valor, `Transferência realizada para ${contaDestino.titular}`);

    contaDestino.depositar(valor, `Transferência recebida de ${this.titular}`);
  }

  exibirDadosConta() {
    console.log(`${this.titular} | CPF: ${this.cpf}`);
    console.log(
      `Conta número ${this.numeroContaFormatado} | Saldo: ${this.saldoFormatado}`,
    );
  }

  exibirExtrato() {
    console.log("========================================");
    this.exibirDadosConta();
    console.log("Extrato:");

    if (this.totalTransacoes === 0) {
      console.log("Não há transações realizadas até o momento.");
    } else {
      console.log(`Possui ${this.totalTransacoes} transações realizadas`);
      this.transacoes.forEach((t) => console.log(t.exibir()));
    }
    console.log(
      "================================================================================",
    );
  }
}

// const acc = new Conta(2569874, "Carla ", "123.456.789", 5000);
// const acc2 = new Conta(3159, " Beatriz", ".456.789", 600);
