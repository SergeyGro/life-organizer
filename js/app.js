import initRouter from './router.js';
import getMenu from './components/menu.js';

document.addEventListener('DOMContentLoaded', () => {
  getMenu();
  initRouter();
});