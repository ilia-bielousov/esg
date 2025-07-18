document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.contacts__tab');
  const panes = document.querySelectorAll('.contacts__pane');

  function activateTab(dept) {
    tabs.forEach(tab =>
      tab.classList.toggle('contacts__tab--active', tab.dataset.dept === dept)
    );
    panes.forEach(pane =>
      pane.classList.toggle('contacts__pane--active', pane.dataset.deptContent === dept)
    );
  }

  // Инициализация
  const first = tabs[0].dataset.dept;
  activateTab(first);

  tabs.forEach(tab =>
    tab.addEventListener('click', () => activateTab(tab.dataset.dept))
  );
});
