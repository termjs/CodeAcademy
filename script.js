const navbarBurger = document.querySelector('.navbar__burger');
const fullscreenMenu = document.querySelector('.fullscreen__menu');
const closeBtn = document.querySelector('.close__button');
const dropdownMenu = document.querySelector('.dropdown__menu');
const header = document.querySelector('.header');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const moreButton = document.getElementById('moreButton');
const dayButtons = document.querySelectorAll('.grid-day.grid-date');
const filterButtons = document.querySelectorAll('.filter-button');
const tableRows = document.querySelectorAll('.table-row');
const linkElements = document.querySelectorAll('.nav-bar-side .shark-1 a');
const linkPlaceElements = document.querySelectorAll('.link-place');
const noSelectionDiv = document.getElementById('no-selection');
const currentDate = new Date();
const currentDay = currentDate.getDate();

navbarBurger.addEventListener('click', () => {
  fullscreenMenu.style.display = 'block';
  header.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
  fullscreenMenu.style.display = 'none';
  header.style.display = 'flex';
});

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
    icon.classList.toggle('rotate-icon');
    isIconRotated = !isIconRotated;
  });

  document.addEventListener('click', function (event) {
    if (!event.target.matches('#moreButton') && isIconRotated) {
      icon.classList.remove('rotate-icon');
      isIconRotated = false;
    }
  });
});

document.addEventListener('click', function (event) {
  const clickedElement = event.target;
  let linkElement = clickedElement.closest('a.path-link');

  if (linkElement) {
    let spanElement = linkElement.previousElementSibling;

    for (let i = 0; i < 2 && spanElement; i++) {
      if (spanElement.tagName === 'SPAN' && spanElement.id && spanElement.id.match(/^start-\d+/)) {
        const idValue = spanElement.getAttribute('id');
        const tempInput = document.createElement('input');

        tempInput.value = `termjs.github.io/codeakademis/mypath.html#${idValue}`;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        break;
      }
      spanElement = spanElement.previousElementSibling;
    }
  }
});

function openModal(imageSrc) {
  modalImage.src = imageSrc;
  modal.style.display = 'block';
}

window.addEventListener('click', (event) => {
  if (event.target === modal || event.target === modalImage) {
    modal.classList.add('fade-out');
    setTimeout(() => {
      modal.style.display = 'none';
      modal.classList.remove('fade-out');
    }, 300);
  }
});

window.addEventListener('scroll', () => {
  if (modal.style.display === 'block') {
    modal.classList.add('fade-out');
    setTimeout(() => {
      modal.style.display = 'none';
      modal.classList.remove('fade-out');
    }, 300);
  }
});

const images = document.querySelectorAll('.mypath-introduction img');
images.forEach((image) => {
  image.addEventListener('click', () => {
    openModal(image.src);
  });
});
function updateActivePathSelection() {
  let activeLinkIndex = -1;

  linkElements.forEach((link, index) => {
    const linkPlace = linkPlaceElements[index];
    const rect = linkPlace.getBoundingClientRect();

    if (rect.top <= 100) {
      activeLinkIndex = index;
    }
  });

  linkElements.forEach((link, index) => {
    if (index === activeLinkIndex) {
      link.classList.add('active-path-selection');
    } else {
      link.classList.remove('active-path-selection');
    }
  });
}

window.addEventListener('scroll', () => {
  updateActivePathSelection();
});

window.addEventListener('resize', () => {
  updateActivePathSelection();
});

updateActivePathSelection();

dayButtons.forEach(button => {
  const buttonDay = parseInt(button.innerText, 10);
  if (buttonDay === currentDay) {
    button.classList.add('active');
  }
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filterValue = button.getAttribute('data-filter');
    const isActive = button.classList.contains('filter-active');

    if (filterValue === 'all') {
      filterButtons.forEach(btn => btn.classList.remove('filter-active'));
      if (!isActive) {
        button.classList.add('filter-active');
      }
    } else {
      const allButton = document.querySelector('[data-filter="all"]');
      if (allButton.classList.contains('filter-active')) {
        allButton.classList.remove('filter-active');
      }
      if (isActive) {
        button.classList.remove('filter-active');
      } else {
        button.classList.add('filter-active');
      }
    }

    const activeFilters = Array.from(filterButtons)
      .filter(btn => btn.classList.contains('filter-active'))
      .map(btn => btn.getAttribute('data-filter'));

    tableRows.forEach(row => {
      const rowFilter = row.getAttribute('data-filter');

      if (activeFilters.includes('all') || activeFilters.includes(rowFilter)) {
        row.style.display = 'table-row';
      } else {
        row.style.display = 'none';
      }
    });

    if (activeFilters.length === 0) {
      noSelectionDiv.style.display = 'block';
    } else {
      noSelectionDiv.style.display = 'none';
    }
  });
});

