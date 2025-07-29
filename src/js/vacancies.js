// Запускаем только если у нас есть нужные элементы на странице
document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('vacanciesList');
  const detailsEl = document.getElementById('vacanciesDetails');
  if (!listEl || !detailsEl) {
    // ничего не делаем, если это не страница «Вакансии»
    return;
  }

  const vacancies = [
    {
      id: 1,
      title: 'Менеджер з продажу',
      location: 'Варшава',
      date: '06.07.2025',
      description: `<h2>Менеджер з продажу</h2><p>Шукаємо енергійного менеджера…</p>`
    },
    {
      id: 2,
      title: 'Інженер‑проєктувальник',
      location: 'Краків',
      date: '10.07.2025',
      description: `<h2>Інженер‑проєктувальник</h2><p>Розробка документації…</p>`
    },
    {
      id: 3,
      title: 'Спеціаліст із постачання',
      location: 'Вроцлав',
      date: '12.07.2025',
      description: `<h2>Спеціаліст із постачання</h2><p>Організація закупівель…</p>`
    },
    {
      id: 4,
      title: 'Бухгалтер',
      location: 'Гданськ',
      date: '15.07.2025',
      description: `<h2>Бухгалтер</h2><p>Ведення фінансової звітності…</p>`
    }
  ];


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
    const v = vacancies.find(x => x.id === +id);
    if (!v) return;
    // сброс активных
    listEl.querySelectorAll('.vacancies__item-btn--active')
      .forEach(btn => btn.classList.remove('vacancies__item-btn--active'));
    // подсветка текущей
    const btn = listEl.querySelector(`.vacancies__item[data-id="${id}"] .vacancies__item-btn`);
    btn?.classList.add('vacancies__item-btn--active');
    // вставляем описание
    detailsEl.innerHTML = v.description;
  }

  listEl.addEventListener('click', e => {
    const item = e.target.closest('.vacancies__item');
    if (item) showDetails(item.dataset.id);
  });

  renderList();
});
