console.log('1')
// Desafio rápido (2 minutos): 
// Crie uma classe Filme com os:
//  atributos titulo, diretor, ano e nota

class Filme {
    constructor(titulo, diretor, ano, nota) {
        this.titulo = titulo
        this.diretor = diretor
        this.ano = ano
        this.nota = nota
    }
}

// Filme (algo genérico - model) => starWars 

const starWars = new Filme()
starWars.anoDeLancamento = 1992

console.log(starWars)

const filme007 = new Filme()
console.log(filme007)

// nesse momento?!
