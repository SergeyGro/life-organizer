import { renderHome, initHome } from './pages/home.js';
import { renderTasks, initTasks } from './pages/tasks.js';
import { renderHabits, initHabits } from './pages/habits.js';
import about from './pages/about.js';
import { currentLink } from './components/menu.js';

const routes = {
    '/life-organizer': renderHome(),
    '/life-organizer/tasks': renderTasks(),
    '/life-organizer/habits': renderHabits(),
    '/life-organizer/about': about
}

function renderRoute(path) {
    let normalizedPath = path;
    if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
        normalizedPath = normalizedPath.slice(0, -1);
    }
    const app = document.getElementById('app');
    if (routes[normalizedPath]) {
        app.innerHTML = routes[normalizedPath];
        if (normalizedPath === '/life-organizer/'){
            initHome();
        }
        if (normalizedPath === '/life-organizer/tasks'){
            initTasks();
        }
        if (normalizedPath === '/life-organizer/habits'){
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