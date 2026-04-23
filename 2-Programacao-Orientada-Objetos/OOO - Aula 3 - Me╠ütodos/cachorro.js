class Cachorro {
  constructor(nome, energia = 100) {
    this.nome = nome;
    this.energia = energia;
  }
  latir() {
    console.log(`${this.nome} diz: Au au!`);
  }
  comer(quantidade) {
    // this.energia += quantidade;
    this.energia = this.energia + quantidade;
  }

  estaComFome() {
    return this.energia < 50;
  }

  rotinaDiaria() {
    this.latir();
    this.comer(30);
    // console.log(`Com fome? ${this.estaComFome() ? "Sim" : "Não"}`);
    if(this.estaComFome()) {
      console.log('sim, está com fome')
    } else {
      console.log('não, não está com fome')
    }
    this.estaFeliz = true
  }
}


const rex = new Cachorro('Rex', 10)
rex.latir()
console.log(rex)
rex.comer(50)
console.log(rex)
// NaN = not a number

const cacau = new Cachorro('Cacau', 200)
console.log(cacau)
cacau.nome = 'Amarelinha'

const gato = {
  nome: 'Felix'
}
gato.nome = 'Outro nome'
gato.idade = 10
console.log(gato)
