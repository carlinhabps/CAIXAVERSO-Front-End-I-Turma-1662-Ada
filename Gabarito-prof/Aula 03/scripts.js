const menuItems = [
  {
    id: "home",
    label: "Home",
    active: true,
  },
  {
    id: "about",
    label: "Sobre nós",
    active: false,
  },
  {
    id: "contact",
    label: "Contato",
    active: false,
  },
];

const menu = document.querySelector("#menu");

// Adicionando elementos via innerHTML
// menuItemsContent = "";
// menuItems.forEach((item) => {
//   menuItemsContent += `
//     <li id="${item.id}" class="item ${item.active ? "active" : ""}">
//         <span href="#">${item.label}</span>
//     </li>
//     `;
// });
// menu.innerHTML = menuItemsContent;

// Adicionando elementos com createElement
menuItems.forEach((item) => {
  const novaLi = document.createElement("li");
  const novaSpan = document.createElement("span");
  novaSpan.id = item.id;
  novaSpan.textContent = item.label;
  novaSpan.classList.add("item");
  if (item.active) {
    novaSpan.classList.add("active");
  }
  novaSpan.href = "#";

  novaLi.appendChild(novaSpan);
  menu.appendChild(novaLi);
});

const items = document.querySelectorAll(".item");
const home = document.querySelector("#home");
const about = document.querySelector("#about");
const contact = document.querySelector("#contact");

function handleActive(event) {
  items.forEach((item) => {
    if (item.id === event.target.id) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

home.addEventListener("click", handleActive);
about.addEventListener("click", handleActive);
contact.addEventListener("click", handleActive);

// home.addEventListener("click", () => {
//   //   removeActive();
//   //   home.classList.add("active");
//   setActive("home");
// });

// about.addEventListener("click", () => {
//   //   removeActive();
//   //   about.classList.add("active");
//   setActive("about");
// });

// contact.addEventListener("click", () => {
//   //   removeActive();
//   //   contact.classList.add("active");
//   setActive("contact");
// });

// function removeActive() {
//   items.forEach((item) => {
//     item.classList.remove("active");
//   });
// }

// function setActive(menuItem) {
//   items.forEach((item) => {
//     if (item.id === menuItem) {
//       item.classList.add("active");
//     } else {
//       item.classList.remove("active");
//     }
//   });
// }
