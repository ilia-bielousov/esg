document.addEventListener('DOMContentLoaded', () => {
  const blogGrid = document.getElementById('blogGrid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const buttons = document.querySelectorAll('.filter-btn');

  let currentFilter = 'all';

  function applyFilter() {
    const cards = document.querySelectorAll('.blog-card');
    cards.forEach(card => {
      const category = card.dataset.category;
      if (currentFilter === 'all' || category === currentFilter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  const initialData = [
    {
      category: 'publication',
      tag: 'Публікації',
      title: 'First DELUXE-CLASS Residences in Kozin',
      img: './../assets/images/1.jpg',
      date: '03.07.2025',
      author: 'автор: Ла Лала',
    },
    {
      category: 'news',
      tag: 'Новини',
      title: 'Новий проєкт у серці Варшави',
      img: './../assets/images/2.webp',
      date: '03.07.2025',
      author: 'автор: Ла Лала',
    },
    {
      category: 'news',
      tag: 'Новини',
      title: 'Розширення портфеля DIM',
      img: './../assets/images/7.jpg',
      date: '03.07.2025',
      author: 'автор: Ла Лала',
    },
    {
      category: 'publication',
      tag: 'Публікації',
      title: 'Інновації в будівництві 2025',
      img: './../assets/images/3.jpg',
      date: '03.07.2025',
      author: 'автор: Ла Лала',
    },
    {
      category: 'publication',
      tag: 'Публікації',
      title: 'Екологічні матеріали: тренд чи необхідність?',
      img: './../assets/images/4.jpg',
      date: '03.07.2025',
      author: 'автор: Ла Лала',
    },
    {
      category: 'publication',
      tag: 'Публікації',
      title: 'Архітектурна досконалість ESG',
      img: './../assets/images/5.jpg',
      date: '03.07.2025',
      author: 'автор: Ла Лала',
    }
  ];

  const fakePosts = [
    {
      category: 'news',
      tag: 'Новини',
      title: 'Новий житловий комплекс у центрі Києва',
      image: './../assets/images/6.jpg',
      date: '10.07.2025',
      author: 'Олег Яремчук',
    },
    {
      category: 'publication',
      tag: 'Публікації',
      title: '10 трендів у сучасному дизайні',
      image: './../assets/images/8.jpg',
      date: '12.07.2025',
      author: 'Ірина Коваль',
    },
    {
      category: 'publication',
      tag: 'Публікації',
      title: 'Як вибрати надійного забудовника',
      image: './../assets/images/9.jpg',
      date: '15.07.2025',
      author: 'Світлана Литвин',
    },
    {
      category: 'news',
      tag: 'Новини',
      title: 'Новий партнер по інженерії',
      image: './../assets/images/10.jpg',
      date: '18.07.2025',
      author: 'Марко Іваненко',
    },
  ];


  let loadedIndex = 0;
  const LOAD_COUNT = 3;

  function createSkeletonCard() {
    const card = document.createElement('div');
    card.classList.add('blog-card', 'skeleton');
    card.innerHTML = `
      <span class="card-tag skeleton-box" style="width: 80px; height: 20px;"></span>
      <h3 class="card-title skeleton-box" style="height: 24px; width: 100%; margin-bottom: 10px;"></h3>
      <div class="card-image-wrapper skeleton-box" style="padding-top: 60%;"></div>
      <div class="card-meta">
        <span class="date skeleton-box" style="width: 60px; height: 12px;"></span>
        <span class="author skeleton-box" style="width: 80px; height: 12px;"></span>
      </div>
    `
    return card;
  }

  function showSkeletons(count) {
    for (let i = 0; i < count; i++) {
      blogGrid.appendChild(createSkeletonCard());
    }
  }

  function removeSkeletons() {
    document.querySelectorAll('.blog-card.skeleton').forEach(el => el.remove());
  }

  function createBlogCard(data) {
    const card = document.createElement('div');
    card.classList.add('blog-card');
    card.setAttribute('data-category', data.category.toLowerCase());

    card.innerHTML = `
      <a href="#" class="blog-link">
        <span class="card-tag">${data.tag || data.category}</span>
        <h3 class="card-title">${data.title}</h3>
        <div class="card-image-wrapper">
          <img src="${data.img || data.image}" alt="\${data.title}">
        </div>
        <div class="card-meta">
          <span class="date">${data.date}</span>
          <span class="author">автор: ${data.author}</span>
        </div>
      </a>
    `

    return card;
  }

  function loadCards(dataArray) {
    const fragment = document.createDocumentFragment();
    dataArray.forEach(data => fragment.appendChild(createBlogCard(data)));
    blogGrid.appendChild(fragment);
  }

  showSkeletons(6);
  setTimeout(() => {
    removeSkeletons();
    loadCards(initialData);
    applyFilter();
  }, 1500);

  loadMoreBtn.addEventListener('click', () => {
    loadMoreBtn.disabled = true;
    showSkeletons(LOAD_COUNT);

    setTimeout(() => {
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < LOAD_COUNT; i++) {
        const post = fakePosts[loadedIndex];
        if (!post) break;
        fragment.appendChild(createBlogCard(post));
        loadedIndex++;
      }

      blogGrid.appendChild(fragment);
      removeSkeletons();
      applyFilter();

      loadMoreBtn.disabled = false;

      if (loadedIndex >= fakePosts.length) {
        loadMoreBtn.style.display = 'none';
      }
    }, 1500);
  });

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.toggle('active', b === btn));
      currentFilter = btn.dataset.filter;
      applyFilter(); // Применяем фильтр при клике
    });
  });
});