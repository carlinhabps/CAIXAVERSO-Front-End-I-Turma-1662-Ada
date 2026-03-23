let contador = 0;

const contadorH2 = document.querySelector("#contador");
const btnMais = document.querySelector("#btn-mais");
const btnMenos = document.querySelector("#btn-menos");
const btnReset = document.querySelector("#btn-reset");

const atualizaInterface = () => {
  contadorH2.innerText = contador;
};

btnMais.addEventListener("click", () => {
  contador++;
  atualizaInterface();
});

btnMenos.addEventListener("click", () => {
  contador--;
  atualizaInterface();
});

btnReset.addEventListener("click", () => {
  contador = 0;
  atualizaInterface();
});
