// ! fetch das chamadas

async function findClient() {
  const resposta = await fetch("http://localhost:3000/clients");

  return await resposta.json();
}
