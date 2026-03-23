const form = document.querySelector("#cadastro");
const usuario = document.querySelector("#usuario");
const senha = document.querySelector("#senha");
const email = document.querySelector("#email");
const error = document.querySelector("#error");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (usuario.value === "" || senha.value === "" || email.value === "") {
    alert("Alguns dos campos obrigatórios não foram preenchidos!");
    return;
  }

  // Validar email no submit
  if (!email.value.includes("@")) {
    alert("Digite um email válido");
  }
  // let emailPossuiArroba = false;
  // const charArr = email.value.split("");
  // charArr.forEach((char) => {
  //   console.log(char);

  //   if (char === "@") {
  //     emailPossuiArroba = true;
  //   }
  // });

  // if (!emailPossuiArroba) {
  //   alert("Digite um email válido");
  // }

  console.log({
    usuario: usuario.value,
    email: email.value,
    senha: senha.value,
  });

  usuario.value = "";
  email.value = "";
  senha.value = "";
});

// Validar o email durante a digitação
// email.addEventListener("keyup", () => {
//   if (!email.value.includes("@")) {
//     error.innerText = "Um email válido precisa ser inserido";
//   } else {
//     error.innerText = "";
//   }
// });

// Validar ao sair do campo
email.addEventListener("blur", () => {
  if (!email.value.includes("@")) {
    error.innerText = "Um email válido precisa ser inserido";
    error.style.color = "#510b0b";
    error.style.backgroundColor = "#5cfc12";
  } else {
    error.innerText = "";
  }
});

// senha.addEventListener("blur", () => {
//   if (senha.value.length < 6) {
//     error.innerText = "A senha precisa ter ao menos 6 caracteres";
//   } else {
//     error.innerText = "";
//   }
// });
