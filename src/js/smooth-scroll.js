// // src/js/smooth-wheel-throttle.js
// document.addEventListener('DOMContentLoaded', () => {
//   let isThrottled = false;
//   const THROTTLE_DELAY = 16;   // ~1 кадр при 60fps
//   const SCROLL_MULTIPLIER = 3;    // в 3 раза больше прокрутки

//   window.addEventListener('wheel', e => {
//     e.preventDefault();
//     if (isThrottled) return;

//     isThrottled = true;
//     const delta = e.deltaY * SCROLL_MULTIPLIER;
//     window.scrollBy({ top: delta, left: 0, behavior: 'smooth' });

//     setTimeout(() => {
//       isThrottled = false;
//     }, THROTTLE_DELAY);
//   }, { passive: false });
// });
