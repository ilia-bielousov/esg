document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.projects-grid');
  const loadMoreBtn = document.getElementById('loadMoreProjectsBtn');
  const filterButtons = document.querySelectorAll('.projects__filter');

  let currentFilter = 'all';
  let loadedIndex = 0;
  const LOAD_COUNT = 3;

  const initialProjects = [
    {
      category: 'construction',
      tag: 'Будівництво',
      title: 'Новий житловий комплекс у Варшаві',
      image: './../assets/images/1.jpg',
    },
    {
      category: 'repair',
      tag: 'Ремонт',
      title: 'Капітальний ремонт квартири',
      image: './../assets/images/3.jpg',
    },
    {
      category: 'repair',
      tag: 'Ремонт',
      title: 'Реконструкція старого фасаду',
      image: './../assets/images/6.jpg',
    },
    {
      category: 'construction',
      tag: 'Будівництво',
      title: 'Будівництво офісного центру',
      image: './../assets/images/7.jpg',
    },
    {
      category: 'construction',
      tag: 'Будівництво',
      title: 'Новий житловий район',
      image: './../assets/images/2.webp',
    },
    {
      category: 'construction',
      tag: 'Будівництво',
      title: 'Приватний котедж під ключ',
      image: './../assets/images/3.jpg',
    },
  ];

  const moreProjects = [
    {
      category: 'repair',
      tag: 'Ремонт',
      title: 'Дизайнерський ремонт студії',
      image: './../assets/images/9.jpg',
    },
    {
      category: 'construction',
      tag: 'Будівництво',
      title: 'Масштабний житловий квартал',
      image: './../assets/images/10.jpg',
    },
    {
      category: 'repair',
      tag: 'Ремонт',
      title: 'Оновлення кухонної зони',
      image: './../assets/images/8.jpg',
    },
  ];

  function createSkeletonCard() {
    const card = document.createElement('div');
    card.classList.add('project-card', 'skeleton');
    card.innerHTML = `
      <span class="card-tag skeleton-box" style="width: 80px; height: 20px;"></span>
      <h3 class="card-title skeleton-box" style="height: 24px; width: 100%; margin-bottom: 10px;"></h3>
      <div class="card-image-wrapper skeleton-box" style="padding-top: 60%;"></div>
    `;
    return card;
  }

  function createProjectCard(data) {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.setAttribute('data-category', data.category);
    card.innerHTML = `
      <a href="#" class="project-link">
        <span class="card-tag">${data.tag}</span>
        <h3 class="card-title">${data.title}</h3>
        <div class="card-image-wrapper">
          <img src="${data.image}" alt="${data.title}">
        </div>
      </a>
    `;
    return card;
  }

  function showSkeletons(count) {
    for (let i = 0; i < count; i++) {
      grid.appendChild(createSkeletonCard());
    }
  }

  function removeSkeletons() {
    document.querySelectorAll('.project-card.skeleton').forEach(el => el.remove());
  }

  function loadCards(dataArray) {
    const fragment = document.createDocumentFragment();
    dataArray.forEach(data => fragment.appendChild(createProjectCard(data)));
    grid.appendChild(fragment);
    applyFilter(); // применим фильтр
  }

  function applyFilter() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      const category = card.dataset.category;
      if (currentFilter === 'all' || category === currentFilter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  showSkeletons(6);
  setTimeout(() => {
    removeSkeletons();
    loadCards(initialProjects);
  }, 1500);

  loadMoreBtn.addEventListener('click', () => {
    loadMoreBtn.disabled = true;
    showSkeletons(LOAD_COUNT);

    setTimeout(() => {
      const dataToLoad = moreProjects.slice(loadedIndex, loadedIndex + LOAD_COUNT);
      loadedIndex += dataToLoad.length;
      removeSkeletons();
      loadCards(dataToLoad);
      loadMoreBtn.disabled = false;

      if (loadedIndex >= moreProjects.length) {
        loadMoreBtn.style.display = 'none';
      }
    }, 1500);
  });

  filterButtons?.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.toggle('active', b === btn));
      currentFilter = btn.dataset.filter;
      applyFilter();
    });
  });
});
