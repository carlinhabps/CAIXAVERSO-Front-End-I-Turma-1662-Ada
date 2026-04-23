// ! Cenários de Teste
// * O projeto deve passar pelos cenários abaixo. Rode no console e confirme os resultados antes de entregar.

// ! 6.1. Criação do banco e contas

const caixa = new Banco("Caixa Econômica Federal");
const corrente = caixa.abrirContaCorrente(
  "Ana Silva",
  "12345678900",
  1000,
  500,
);
const poupanca = caixa.abrirContaPoupanca("Ana Silva", "12345678900", 500);
// Ana tem 2 contas com o mesmo CPF
console.log(caixa.buscarPorCpf("12345678900").length); // 2

// ! 6.2. Operações básicas

corrente.depositar(500); // saldo: 1500
corrente.sacar(200); // saldo: 1300
console.log(corrente.saldo); // 1300

// ! 6.3. Polimorfismo do sacar()

// Conta corrente: usa cheque especial
corrente.sacar(1500); // OK (saldo: -200)
console.log(corrente.saldo); // -200
// Conta poupança: não permite negativo
poupanca.sacar(1500); // deve lançar erro

// ! 6.4. Rendimento da poupança

poupanca.aplicarRendimento(); // saldo sobe 0,5%
// Transacao do tipo "rendimento" deve aparecer no extrato

// ! 6.5. Transferência

corrente.transferir(100, poupanca);
// Deve registrar 1 transação de saída em corrente
// Deve registrar 1 transação de entrada em poupanca

// ! 6.6. Validações

try {
  corrente.depositar(-50);
} catch (e) {
  console.log(e.message);
}
try {
  corrente.cpf = "123";
} catch (e) {
  console.log(e.message);
}
try {
  corrente.titular = "";
} catch (e) {
  console.log(e.message);
}
try {
  corrente.transferir(10, corrente);
} catch (e) {
  console.log(e.message);
}

// ! 6.7. Encapsulamento

corrente.saldo = 999999; // deve ser ignorado (sem setter)
// corrente.#saldo = 999999; // deve dar SyntaxError

// ! 6.8. Getters do banco

console.log(caixa.totalContas); // 2
console.log(caixa.saldoTotal); // soma dos saldos das 2 contas

// ! 6.9. Encerrar conta

// Não pode encerrar conta com saldo
try {
  caixa.encerrarConta(corrente.numero);
} catch (e) {
  console.log(e.message);
}
// Zerar e encerrar
corrente.sacar(corrente.saldo); // para contas com saldo positivo
caixa.encerrarConta(corrente.numero); // deve funcionar
