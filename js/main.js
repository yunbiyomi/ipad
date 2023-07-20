import ipads from '../data/ipads.js';
import navigations from '../data/navigations.js';

// 장바구니
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


// 검색
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', (e) => {
  e.stopPropagation();
  hideSearch();
});
searchShadowEl.addEventListener('click', hideSearch);

function showSearch() {
  headerEl.classList.add('searching');
  stopScroll();
  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's';
  });
  searchDelayEls.forEach((el, index) => {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's';
  });
  setTimeout(() => {
    searchInputEl.focus();
  }, 600);
}

function hideSearch() {
  headerEl.classList.remove('searching');
  palyScroll()
  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's';
  });
  searchDelayEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's';
  });
  searchDelayEls.reverse();
  searchInputEl.value = '';
}

function palyScroll() {
  document.documentElement.classList.remove('fixed');
}

function stopScroll() {
  document.documentElement.classList.add('fixed');
}

// 헤더 메뉴 토글
const menuStarterEl = document.querySelector('header .menu-starter');
menuStarterEl.addEventListener('click', () => {
  if(headerEl.classList.contains('menuing')){
    headerEl.classList.remove('menuing');
    searchInputEl.value = ''
    palyScroll();
  }
  else {
    headerEl.classList.add('menuing');
    stopScroll();
  }
});


// 헤더 검색
const searchTextFieldEl = document.querySelector('header .textfield');
const searchCancelEl = document.querySelector('header .search-canceler');
searchTextFieldEl.addEventListener('click', () => {
  headerEl.classList.add('searching--mobile');
  searchInputEl.focus();
});
searchCancelEl.addEventListener('click', () => {
  headerEl.classList.remove('searching--mobile');
});


window.addEventListener('resize', () => {
  if(window.innerWidth <= 740) {
    
  }
  else {
    headerEl.classList.remove('searching--mobile');
  }
});


const navEl = document.querySelector('nav');
const navMenuToggleEl = navEl.querySelector('.menu-toggler');
const navMenuShadowEl = navEl.querySelector('.shadow');

navMenuToggleEl.addEventListener('click', () => {
  if(navEl.classList.contains('menuing')) {
    hideNavMenu();
  }
  else {
    showNavMenu();
  }
});

navEl.addEventListener('click', (e) => {
  e.stopPropagation();
})

navMenuShadowEl.addEventListener('click', hideNavMenu)
window.addEventListener('click', hideNavMenu)

function showNavMenu() {
  navEl.classList.add('menuing');
}

function hideNavMenu() {
  navEl.classList.remove('menuing');
}


// 요소의 가시성 관찰
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show');
  });
});
const infoEls = document.querySelectorAll('.info');
infoEls.forEach((el) => {
  io.observe(el);
});


// 비디오 재생
const video = document.querySelector('video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click', () => {
  video.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
});

pauseBtn.addEventListener('click', () => {
  video.pause();
  playBtn.classList.remove('hide');
  pauseBtn.classList.add('hide');
});


// '당신에게 맞는 iPad는?' 렌더링
const itemsEl = document.querySelector('section.compare .items');
ipads.forEach((ipad) => {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  let colorList = '';
  ipad.colors.forEach((color) => {
    colorList += `<li style="background-color: ${color};"></li>`
  });

  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}">
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩ ${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
    `

  itemsEl.append(itemEl);
});


// Navigations
const navigationsEl = document.querySelector('footer .navigations');
navigations.forEach((nav) => {
  const mapEl = document.createElement('div');
  mapEl.classList.add('map');

  let mapList = '';
  nav.maps.forEach((map) => {
    mapList += /* html */ `
      <li>
        <a href="${map.url}">${map.name}</a>
      </li>
      `
  });

  mapEl.innerHTML = /* html */ `
  <h3>
    <span class="text">${nav.title}</span>
    <span class="icon">+</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `

  navigationsEl.append(mapEl);
});


// 올해의 연도
const thisYearEl = document.querySelector('span.this-year');
thisYearEl.textContent = new Date().getFullYear();


const mapEls = document.querySelectorAll('footer .navigations .map');
mapEls.forEach((el) => {
  const h3El = el.querySelector('h3');
  h3El.addEventListener('click', () => {
    el.classList.toggle('active');
  })
})