const doc = (select) => document.querySelector(select);

const texto = doc("#contador");
const mais = doc("#btn-mais");
const menos = doc("#btn-menos");
const reset = doc("#btn-reset");

let contador = 0;

mais.addEventListener("click", () => {
  contador++;
  color();
});

menos.addEventListener("click", () => {
  contador--;
  color();
});

reset.addEventListener("click", () => {
  contador = 0;
  color();
});

function removeClasses() {
  texto.classList.remove("reset");
  texto.classList.remove("positivo");
  texto.classList.remove("negativo");
}

function color() {
  removeClasses();

  if (contador > 0) {
    texto.classList.add("positivo");
  } else if (contador < 0) {
    texto.classList.add("negativo");
  } else {
    texto.classList.add("reset");
  }

  texto.innerHTML = contador;
}
