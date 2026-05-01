import { renderHome, initHome } from './pages/home.js';
import { renderTasks, initTasks } from './pages/tasks.js';
import { renderHabits, initHabits } from './pages/habits.js';
import about from './pages/about.js';
import { currentLink } from './components/menu.js';

const basePath = '/life-organizer';

const routes = {
    '/': renderHome(),
    '/tasks': renderTasks(),
    '/habits': renderHabits(),
    '/about': about
}

function normalizePath(path) {
    if (path === basePath) return '/';
    if (path.startsWith(basePath + '/')) {
        return path.slice(basePath.length);
    }
    return path;
}

function renderRoute(path) {
    const normalizedPath = normalizePath(path);
    const render = routes[normalizedPath];
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