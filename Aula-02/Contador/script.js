const doc = (select) => document.querySelector(select);

const texto = doc("#contador");
const mais = doc("#btn-mais");
const menos = doc("#btn-menos");
const reset = doc("#btn-reset");

let contador = 0;

mais.addEventListener("click", () => {
  contador++;
  texto.innerHTML = contador;
});

menos.addEventListener("click", () => {
  contador--;
  texto.innerHTML = contador;
});

reset.addEventListener("click", () => (texto.innerHTML = 0));
