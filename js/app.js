import initRouter from './router.js';
import getMenu from './components/menu.js';
import getFooter from './components/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  getMenu();
  initRouter();
  getFooter();
});