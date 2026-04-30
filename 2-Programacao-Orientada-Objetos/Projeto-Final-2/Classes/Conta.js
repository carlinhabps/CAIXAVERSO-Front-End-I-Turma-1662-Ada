// ! Classe base com atributos e métodos comuns a qualquer tipo de conta - Não deve ser instanciada diretamente — apenas ContaCorrente e ContaPoupanca.
// ?   Atributos privados
// // * #numero (number): número único da conta
// // * #titular (string)
// // * #cpf (string): armazenado apenas com os 11 dígitos
// // * #saldo (number)
// // * #transacoes (array de Transacao)
// ?   Constructor
// // * Recebe: número, titular, CPF e depósito inicial (opcional, padrão 0)
// // * Se houver depósito inicial, deve chamar this.depositar() automaticamente para que a transação seja registrada
// ?   Getters
// // * numero (somente leitura — sem setter)
// // * titular
// // * cpf
// // * saldo (somente leitura — sem setter; alterações só via métodos)
// // * transacoes: retornar cópia do array com spread [...#transacoes]
// // * totalTransacoes (getter computado): quantidade de transações
// ?   Setters com validação
// // * titular: rejeitar string vazia ou só espaços. Armazenar com .trim()
// // * cpf: normalizar removendo pontos/traços/espaços. Validar que tem exatamente 11 dígitos após normalização
// ?   Métodos
// // * depositar(valor, descricao): validar número positivo. Somar ao saldo e registrar Transacao
// // * sacar(valor, descricao): validação básica. SERÁ SOBRESCRITO nas subclasses
// // * transferir(valor, contaDestino): verificar com instanceof que destino é uma Conta e que não é a mesma. Reutilizar sacar() e depositar()
// // * exibirExtrato(): imprimir no console histórico completo e saldo atual

class Conta {
  #numeroConta;
  #titular;
  #cpf;
  #saldo;
  #transacoes;

  constructor(numeroConta, nomeTitular, cpf, saldoInicial = 0) {
    this.#numeroConta = numeroConta;
    this.titular = nomeTitular;
    this.cpf = cpf;
    this.#saldo = 0;
    this.#transacoes = [];

    if (saldoInicial > 0)
      this.depositar(saldoInicial, "Depósito na abertura da conta");

    if (saldoInicial < 0)
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
    const numConta = String(this.#numeroConta).padStart(6, "0");
    const dv = Math.floor(Math.random() * 10);
    return `${numConta}-${dv}`;
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

  get saldo() {
    return Number(this.#saldo).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  get transacoes() {
    return [...this.#transacoes];
  }

  get totalTransacoes() {
    return this.#transacoes.length;
  }

  depositar(valor, descricao = "depósito") {
    if (valor <= 0) {
      throw new Error("Informe um valor positivo para efetivar a transação.");
      return console.log(Error);
    }
    this.#saldo += valor;
    const novoDeposito = new Transacao("depósito", valor, descricao);
    this.#transacoes.push(novoDeposito);

    this.exibirExtrato();
  }

  sacar(valor, descricao = "saque") {
    if (valor > this.#saldo) {
      throw new Error(
        `Operação não realizada! Saldo insuficiente para realizar a transação. Seu saldo atual é de ${this.saldo}.`,
      );
      return console.log(Error);
    }

    if (valor <= 0) {
      throw new Error(
        `Operação não realizada! O valor da transação deve ser maior que zero.`,
      );
      return console.log(Error);
    }
    this.#saldo -= valor;
    const novoSaque = new Transacao("saque", valor, descricao);
    this.#transacoes.push(novoSaque);

    this.exibirExtrato();
  }

  transferir(valor, contaDestino) {
    if (contaDestino === this.#numeroConta) {
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

  exibirExtrato() {
    console.log(`${this.titular} | CPF: ${this.cpf}`);
    console.log(`Conta número ${this.numeroConta} | Saldo: ${this.saldo}`);
    console.log("Extrato:");

    if (this.totalTransacoes === 0) {
      console.log("Não há transações realizadas até o momento.");
    } else {
      console.log(`Possui ${this.totalTransacoes} transações realizadas`);
      this.transacoes.forEach((t) => console.log(t.exibir()));
    }
  }
}

// const acc = new Conta(2569874, "Carla ", "123.456.789", 5000);
// const acc2 = new Conta(3159, " Beatriz", ".456.789", 600);
