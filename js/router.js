import { renderHome, initHome } from './pages/home.js';
import { renderTasks, initTasks } from './pages/tasks.js';
import { renderHabits, initHabits } from './pages/habits.js';
import about from './pages/about.js';
import { currentLink } from './components/menu.js';

const routes = {
    '/': renderHome(),
    '/tasks': renderTasks(),
    '/habits': renderHabits(),
    '/about': about
}

function renderRoute(path) {
    let normalizedPath = path;
    if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
        normalizedPath = normalizedPath.slice(0, -1);
    }
    const app = document.getElementById('app');
    if (routes[normalizedPath]) {
        app.innerHTML = routes[normalizedPath];
        if (normalizedPath === '/'){
            initHome();
        }
        if (normalizedPath === '/tasks'){
            initTasks();
        }
        if (normalizedPath === '/habits'){
            initHabits();
        }
    } else {
        app.innerHTML = '<h1>404</h1><p>Такой страницы нет</p>';
    }
}

function handleLinks() {
    header.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href === window.location.pathname) {
                return;
            }
            history.pushState(null, null, href);
            renderRoute(href);
            currentLink();
        });
    });
}

export default function initRouter() {
    renderRoute(window.location.pathname);
    handleLinks();
    window.addEventListener('popstate', () => {
    renderRoute(window.location.pathname);
    });
}