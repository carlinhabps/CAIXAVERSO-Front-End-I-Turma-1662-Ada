// ! fetch das chamadas

const dataBase = "http://localhost:3000/";

async function findObject(object) {
  const resposta = await fetch(`${dataBase + object}`);

  return await resposta.json();
}

async function findObjectId(object, id) {
  const resposta = await fetch(`${dataBase + object}/${id}`);

  return await resposta.json();
}

async function findObjectKeyValue(object, key, value) {
  const resposta = await fetch(`${dataBase + object}?${key}=${value}`);

  return await resposta.json();
}

async function newRegister(object, data) {
  const resposta = await fetch(`${dataBase + object}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await resposta.json();
}

async function editRegister(object, editedData) {
  const resposta = await fetch(`${dataBase + object}/${editedData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedData),
  });
  return await resposta.json();
}

async function deleteRegister(object, id) {
  const resposta = await fetch(`${dataBase + object}/${id}`, {
    method: "DELETE",
  });
  return await resposta.json();
}
