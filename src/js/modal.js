// src/js/modal.js
class Modal {
  constructor() {
    this._init();
  }

  _init() {
    // Создаём в DOM разметку модалки
    this.el = document.createElement('div');
    this.el.className = 'modal';
    this.el.innerHTML = `
      <div class="modal__overlay"></div>
      <div class="modal__dialog">
        <button class="modal__close" aria-label="Закрыть">&times;</button>
        <div class="modal__content"></div>
      </div>
    `;
    document.body.appendChild(this.el);

    this.overlay = this.el.querySelector('.modal__overlay');
    this.dialog = this.el.querySelector('.modal__dialog');
    this.closeBtn = this.el.querySelector('.modal__close');
    this.content = this.el.querySelector('.modal__content');

    // События закрытия
    this.overlay.addEventListener('click', () => this.close());
    this.closeBtn.addEventListener('click', () => this.close());
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.el.classList.contains('modal--open')) {
        this.close();
      }
    });
  }

  open(html) {
    // Вставляем контент
    this.content.innerHTML = html;

    // Вычисляем ширину скроллбара
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Добавляем отступ к body и отключаем прокрутку
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.querySelector('.header').style.paddingRight = `${scrollBarWidth}px`;

    document.body.style.overflow = 'hidden';

    // Показываем модалку
    this.el.classList.add('modal--open');
  }

  close() {
    this.el.classList.remove('modal--open');

    // Убираем компенсацию и возвращаем scrolling
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.querySelector('.header').style.paddingRight = '';
  }
}

// Экспортируем единственный экземпляр и удобные функции
const modalInstance = new Modal();
export function openModal(html) {
  modalInstance.open(html);
}
export function closeModal() {
  modalInstance.close();
}