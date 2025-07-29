document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.projects__filter');
  const cards = document.querySelectorAll('.project-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1) Переключение активной кнопки
      buttons.forEach(b => b.classList.toggle('active', b === btn));

      // 2) Значение фильтра
      const filter = btn.dataset.filter;

      // 3) Фильтрация карточек
      cards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});
