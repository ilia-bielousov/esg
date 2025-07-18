import './../scss/main.scss';
// import './*.js'; остальные файлы

// Подгрузка хедера
fetch('/components/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

// Подгрузка футера
fetch('/components/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });


// для вакансий.
document.addEventListener('DOMContentLoaded', () => {
  const vacancies = [
    {
      id: 1,
      title: 'Менеджер по продажам',
      location: 'Варшава',
      date: '06.07.2025',
      description: `
        <h2>Менеджер по продажам</h2>
        <p>Ищем энергичного менеджера для работы с ключевыми клиентами...</p>
        <ul>
          <li>Требования: опыт от 2 лет, знание английского</li>
          <li>Условия: офис в центре, гибкий график</li>
        </ul>
      `
    },
    {
      id: 2,
      title: 'Инженер‑проектировщик',
      location: 'Краков',
      date: '10.07.2025',
      description: `
        <h2>Инженер‑проектировщик</h2>
        <p>Разработка технической документации и чертежей для строительных объектов...</p>
      `
    },
    {
      id: 3,
      title: 'Специалист по снабжению',
      location: 'Вроцлав',
      date: '12.07.2025',
      description: `
        <h2>Специалист по снабжению</h2>
        <p>Организация закупок материалов и оборудования...</p>
      `
    },
    {
      id: 4,
      title: 'Бухгалтер',
      location: 'Гданьск',
      date: '15.07.2025',
      description: `
        <h2>Бухгалтер</h2>
        <p>Ведение финансовой отчётности, работа с налоговыми отчётами...</p>
      `
    }
  ];

  const listEl = document.getElementById('vacanciesList');
  const detailsEl = document.getElementById('vacanciesDetails');
  if (!listEl || !detailsEl) {
    console.error('Элементы списка или деталей не найдены в DOM');
    return;
  }

  function renderList() {
    listEl.innerHTML = vacancies.map(v => `
      <li class="vacancies__item" data-id="${v.id}">
        <button class="vacancies__item-btn" type="button">
          <span class="vacancies__item-name">${v.title}</span>
          <span class="vacancies__item-meta">${v.location}, ${v.date}</span>
        </button>
      </li>
    `).join('');
  }

  function showDetails(id) {
    const v = vacancies.find(item => item.id === Number(id));
    if (!v) return;

    // Снятие класса active
    document
      .querySelectorAll('.vacancies__item-btn--active')
      .forEach(btn => btn.classList.remove('vacancies__item-btn--active'));

    const btn = listEl.querySelector(`.vacancies__item[data-id="${id}"] .vacancies__item-btn`);
    btn?.classList.add('vacancies__item-btn--active');

    detailsEl.innerHTML = v.description;
  }

  listEl.addEventListener('click', e => {
    const item = e.target.closest('.vacancies__item');
    if (item) showDetails(item.dataset.id);
  });

  renderList();

  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');
  const dropdownToggles = document.querySelectorAll('.header__menu-item--has-dropdown > .header__menu-link');

  // Открытие/закрытие мобильного меню
  burger?.addEventListener('click', () => {
    nav?.classList.toggle('is-open');
  });

  // Раскрытие подменю
  dropdownToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // только для мобильного: на десктопе ховер
      if (window.innerWidth <= 767) {
        const parent = btn.parentElement;
        parent.classList.toggle('is-open');
      }
    });
  });
});



// src/js/header.js

