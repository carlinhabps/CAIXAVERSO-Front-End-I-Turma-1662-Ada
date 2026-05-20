const func1 = { nome: "Ana", cargo: "Dev", salario: 5000, gerente: "Marcela" };
const func2 = { nome: "Carlos", cargo: "QA", salario: 4500, gerante: "Eloisa" };
const func3 = { nome: "Bia", cargoo: "Design", salario: 4000 };
const func4 = { nome: "Diego", cargo: "Dev", salario: 5200 };
const func5 = { nome: "Eva", funcao: "PM", salario: 6000 };

const func6 = { nome: "Eva", funcao: "PM", salario: 6000, gerente: "Thiago" };

// dicionário 
// indice: significado 
// index: value
// indice: valor (strings, booleanos, arrays, numeros, .....)
console.log(func6)


// const canalGuilherme = {titiulo: "Manual do Mundo", dono: "Berê"}
// const alexandreControleDeEstoque = { produto: "Monjouro", estoque: 0 }

// string, booleanos (verdadeiro e falso), number = por valor 
// objetos e os arrays = por referencia

// const obj1 = {nome: 'André Luiz'}
// console.log(obj1)
// obj1 = 300 // reclamou, quebrou, deu erro,...
// console.log(obj1)

// const pessoaAndre = {nome: 'André Luiz'}
// console.log(pessoaAndre)
// console.log(pessoaAndre.idade)
// pessoaAndre.nome = 'Fernanda'
// pessoaAndre.idade = 34
// console.log(pessoaAndre.idade)

// // objetos e arrays 

// 
// const valoresEmBranco = null

// não declarar variaveis para undefined
// const valoresEmBranco = undefined
// const pessoaXYZ = {nome: null, idade: null, signo: null}
// console.log(pessoaXYZ.cargo)

function adicionarNumeros(numero1, numero2) {
    // interno
    // retorna algo, ou não.
    // retornar a soma
    return numero1 + numero2
}

console.log(adicionarNumeros(20, 30))   
