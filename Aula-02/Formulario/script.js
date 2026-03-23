const doc = (select) => document.querySelector(select);

const cadastro = doc("#cadastro");

cadastro.addEventListener("submit", (event) => {
  event.preventDefault();

  const usuario = doc("#usuario").value;
  const senha = doc("#senha").value;
  const email = doc("#email").value;
  const mensagem = doc("#mensagem");

  if (usuario === "" || senha === "" || email === "") {
    mensagem.innerHTML = `<p class = "erro"> Há campo obrigatório não preenchido!</p>`;
    return;
  }

  if (!email.includes("@")) {
    mensagem.innerHTML = `<p class = "erro"> Digite um e-mail válido!</p>`;
    return;
  }

  if (senha.length < 6) {
    mensagem.innerHTML = `<p class = "erro"> A senha deve ter no mínimo 6 caracteres!</p>`;
    return;
  }

  console.log({ usuario, senha, email });

  doc("#usuario").value = "";
  doc("#senha").value = "";
  doc("#email").value = "";

  mensagem.innerHTML = `<p class="success"> Cadastro realizado!</p>`;

  console.log("Formmulário enviado!");
});
