// 1º definição da classe
class Produto {
    // nome = 'Produto 1'
    // preco = 36.75

    // dados compartilhados (static) 
    estoque = 200
    categoria = "Produto genérico"

    // this => this (ao contexto inserido / contexto de classe => a instancia em si)

    // o que é esperado no constructor, devemos passar na hora da instância
    // lint = ferramentas para manter a consitencia e formatação do seu código

    // constructor = definir valores internos (valores variaveis por instancia e algum setup de classe())
    // constructor(nomeQueVeioDoConstructor = 'Produto sem nome', preco) {
    // MOMENTO DE NASCIMENTO DA NOSSA INSTANCIA:
    constructor(nomeQueVeioDoConstructor, preco, frete = 200, notificarCliente = false) {
        // importante: validar entrada
        // if/else = se uma coisa, ou outra acontecer, fazer uma ação
        //  
        // if(true) / if(false) / if(true || false)
        // if(booleano = true or false)
        // console.log(Boolean("Nome do produto"))
        // console.log(!"")
        if(!nomeQueVeioDoConstructor) {
            // quebrar a aplicação
            // new Error => quebra a aplicação se não tratado corretamente, o app para naquele erro
            // try/catch => tratar erros seja no javascript, ou em outras muitas linguanges (pesquisar)
            throw new Error('fornecer nome, pois é obrigatório')
        }

        this.nome = nomeQueVeioDoConstructor
        this.preco = Number(preco)
        this.frete = frete 
        // this.enderecoCentroLogistico = { cep: '03521000', rua: 'Rua xpto' }

        // console.log('novo produto novo nosso shopping, e mandar email pro cliente')
        if(notificarCliente) this.notificarCliente()
    }

    // encapsulamento = colocar em capsulas, em containers, em classes
    despachar() {
        this.estoque -= 1
        return this.nome + ' despachado!'
    }

    notificarCliente() {
        return 'Cliente vai ser notificado sobre ' + this.nome + '!'
    }
}

// produto em estoque: avisar cliente
// produto foi despachado: avisar cliente


// 2ª instanciamento da classe, 1 instância, criando um objeto daquela classe
// new para criar instancias de um classe
const ps5Produto = new Produto('PS5 Pro', "6000", 1000) // Number() converte para string
const gameBoyProduto = new Produto('Game Boy Advance', 200.99)

// tá tudo fazer isso manualmente, PORÉM se é algo que acontece quando o item "nasce"
// podemos adicionar o chamado no 
// console.log(ps5Produto.notificarCliente())
// console.log(gameBoyProduto.notificarCliente())

// null, undefined, string vazia "", number 0 => valores considerados falsos/vazios
// const produto3 = new Produto(null, 500)

// console.log(Produto)
console.log(ps5Produto)
console.log(gameBoyProduto)
// console.log(produto3)

console.log(ps5Produto.despachar())
// [object Object] = um objeto foi convertido para string
console.log(ps5Produto)

console.log(ps5Produto.despachar())
console.log(ps5Produto.despachar())
console.log(ps5Produto.despachar())
console.log(ps5Produto)

console.log(gameBoyProduto.despachar())
console.log(gameBoyProduto)