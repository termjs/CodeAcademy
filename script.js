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

const moreButton = document.getElementById('moreButton');
const dropdownMenu = document.querySelector('.dropdown__menu');

moreButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', (event) => {
  if (!event.target.matches('#moreButton')) {
    dropdownMenu.classList.remove('show');
  }
});

let isIconRotated = false;

document.addEventListener('DOMContentLoaded', function () {
  const moreButton = document.getElementById('moreButton');
  const icon = moreButton.querySelector('i');

  moreButton.addEventListener('click', function () {
    icon.classList.toggle('rotate180');
    isIconRotated = !isIconRotated;
  });

  document.addEventListener('click', function (event) {
    if (!event.target.matches('#moreButton') && isIconRotated) {
      icon.classList.remove('rotate180');
      isIconRotated = false;
    }
  });
});

document.addEventListener('click', function(event) {
  const clickedElement = event.target;

  let elementWithStartId = clickedElement.closest('[id^="start-"]');

  if (elementWithStartId) {
      const idValue = elementWithStartId.getAttribute('id');
      const tempInput = document.createElement('input');

      tempInput.value = `termjs.github.io/codeakademis/mypath.html#`+idValue;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
  }
});
