const navbarBurger = document.querySelector('.navbar__burger');
const fullscreenMenu = document.querySelector('.fullscreen__menu');
const closeBtn = document.querySelector('.close__button');
const header = document.querySelector('.header');


navbarBurger.addEventListener('click', () => {
  fullscreenMenu.style.display = 'block';
  header.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
  fullscreenMenu.style.display = 'none';
  header.style.display = 'flex';
});