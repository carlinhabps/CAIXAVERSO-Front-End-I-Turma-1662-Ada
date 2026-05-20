// Abordagem FUNCIONAL — dados e funções separados
const cachorro = { nome: "Rex", energia: 100 };

function fazerCachorroLatir(dog) {
  console.log(`${dog.nome} diz: Au au!`);
}

function alimentarCachorro(dog, quantidade) {
  dog.energia += quantidade;
  console.log(dog.energia)
}
// NAN = not a number = não é um número