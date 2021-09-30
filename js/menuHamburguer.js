const menu = document.getElementById('menu-hamburguer');
const header = document.querySelector("header");

function menuHamburguer() {
  header.classList.toggle('active');
}

menu.addEventListener('click', menuHamburguer)