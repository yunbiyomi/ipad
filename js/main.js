const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
  if (basketEl.classList.contains('show')) {
    hideBasket();
  } else {
    showBasket();
  }
});

basketEl.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
});

window.addEventListener('click', () => {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add('show');
}

function hideBasket() {
  basketEl.classList.remove('show');
}