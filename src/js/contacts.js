document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.contacts__tab');
  const panes = document.querySelectorAll('.contacts__pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.dept;

      // Активная вкладка
      tabs.forEach(t => t.classList.toggle('contacts__tab--active', t === tab));

      // Показываем соответствующую панель
      panes.forEach(pane => {
        const match = pane.dataset.deptContent === target;
        pane.classList.toggle('contacts__pane--active', match);
      });
    });
  });
});
