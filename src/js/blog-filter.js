document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.blog-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1) Обновляем активную кнопку
      buttons.forEach(b => b.classList.toggle('active', b === btn));

      // 2) Берём фильтр: all | publication | news
      const filter = btn.dataset.filter;

      // 3) Показываем/скрываем карточки
      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});
