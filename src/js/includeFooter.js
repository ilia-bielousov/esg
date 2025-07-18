import footerTpl from '../components/footer.html?raw';

document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.querySelector('footer-placeholder');
  if (!placeholder) return;
  placeholder.innerHTML = footerTpl;
});
