// src/js/includeHeader.js
import headerTpl from '../components/header.html?raw';

document.addEventListener('DOMContentLoaded', () => {
  // Ищем плейсхолдер в разметке
  const placeholder = document.querySelector('header-placeholder');
  if (!placeholder) return;

  // Вставляем HTML шапки
  placeholder.innerHTML = headerTpl;

  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');
  const closeBtn = document.querySelector('.header__nav-close');
  const menuItems = document.querySelectorAll('.header__menu-item[data-sub]');

  const SUBMENUS = {
    company: [
      { text: 'Про нас', href: './../pages/about' },
      { text: 'Сервіси', href: './../pages/services' },
      { text: 'Інвестиційні програми', href: './../pages/invest' },
      { text: 'Архітектурне-бюро', href: './../pages/architec' },
      { text: 'Дизайн бюро', href: '/next' },
    ],
    projects: [
    ],
    news: [
    ],
    contacts: [
      { text: 'Наш офіс', href: '/contacts' },
      { text: 'Вакансії', href: './../pages/vacancies' }
    ],
    lang: [
      { text: 'Ua', href: '/?lang=ua' },
      { text: 'Pl', href: '/?lang=pl' },
      { text: 'En', href: '/?lang=en' }
    ]
  };

  // открываем/закрываем мобильное меню
  burger?.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    menuItems.forEach(i => i.classList.remove('is-open'));
  });
  closeBtn?.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuItems.forEach(i => i.classList.remove('is-open'));
  });

  // Аккордеон только для тех, у кого есть SUBMENUS[key].length > 0
  menuItems.forEach(item => {
    const key = item.dataset.sub;
    const items = SUBMENUS[key] || [];
    const mobileList = item.querySelector('.header__submenu-list--mobile');

    if (items.length) {
      mobileList.innerHTML = items
        .map(i => `<li><a href="${i.href}">${i.text}</a></li>`)
        .join('');
      item.addEventListener('click', () => {
        if (window.innerWidth <= 767) {
          menuItems.forEach(i => i !== item && i.classList.remove('is-open'));
          item.classList.toggle('is-open');
        }
      });
      item.addEventListener('mouseenter', () => {
        const desktopList = document.querySelector('.header__submenu-list--desktop');
        desktopList.innerHTML = items
          .map(i => `<li><a href="${i.href}">${i.text}</a></li>`)
          .join('');
        document.querySelector('.header__submenu-wrapper--desktop').classList.add('is-open');
        item.classList.add('is-active');
      });
    }
  });

  // Скрыть десктоп‑submenu
  document.querySelector('.header').addEventListener('mouseleave', () => {
    document.querySelector('.header__submenu-wrapper--desktop').classList.remove('is-open');
    menuItems.forEach(i => i.classList.remove('is-active'));
  });

  // Новый: языковая панель
  const langToggle = document.querySelector('.header__lang-toggle');
  const langPanel = document.querySelector('.header__lang-panel');

  langToggle?.addEventListener('click', () => {
    const parent = langToggle.closest('.header__menu-item--lang');
    const panel = parent.querySelector('.header__lang-panel');
    panel.classList.toggle('is-open');
  });
  // Клик вне панели — закрыть
  document.addEventListener('click', e => {
    if (!langPanel.contains(e.target) && !langToggle.contains(e.target)) {
      langPanel.classList.remove('is-open');
    }
  });

});