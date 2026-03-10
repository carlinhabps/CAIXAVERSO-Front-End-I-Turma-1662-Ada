const novoTitulo = document.getElementById("titulo");

novoTitulo.innerText = "Minha Lista VIP";

const itemUrgente = document.getElementsByClassName("urgente");
console.log(itemUrgente);

for (let item of itemUrgente) {
  item.style.color = "red";
}

const firstItem = document.querySelector("li");

firstItem.style.fontWeight = "bold";

console.log(firstItem);

const itens = document.querySelectorAll(".item");

console.log(itens);

itens.forEach((item) => {
  item.textContent += "🛒";
});

const botao = document.querySelector("#adiciona-btn");

botao.style.backgroundColor = "brown";
