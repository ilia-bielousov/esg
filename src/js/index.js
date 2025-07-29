import { openModal } from './/modal.js';
import './../scss/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');
  const dropdownToggles = document.querySelectorAll('.header__menu-item--has-dropdown > .header__menu-link');
  const closeBtn = document.querySelector('.header__nav-close');


  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.add('is-open');
    });
  }

  if (closeBtn && nav) {
    closeBtn.addEventListener('click', () => {
      nav.classList.remove('is-open');
    });
  }

  dropdownToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // только для мобильного: на десктопе ховер
      if (window.innerWidth <= 767) {
        const parent = btn.parentElement;
        parent.classList.toggle('is-open');
      }
    });
  });

  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-modal-template]');
    if (!trigger) return;

    const tplId = trigger.dataset.modalTemplate;
    const tpl = document.getElementById(tplId);
    if (!tpl) {
      console.warn(`Template "${tplId}" not found`);
      return;
    }

    openModal(tpl.innerHTML);
  });
});
