import home from './pages/home.js'
import { renderTasks, openModal } from './pages/tasks.js'
import habits from './pages/habits.js'
import about from './pages/about.js'
import { closeModal, addTask } from './components/modal.js';

const routes = {
    '/': home,
    '/tasks': renderTasks(),
    '/habits': habits,
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
    if (normalizedPath === '/tasks'){
        openModal();
        closeModal();
        addTask();
    }
    } else {
    app.innerHTML = '<h1>404</h1><p>Такой страницы нет</p>';
    }
}

function handleLinks() {
    document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href === window.location.pathname) {
            return;
        }
        history.pushState(null, null, href);
        renderRoute(href);
    });
});
}

export default function initRouter() {
    renderRoute(window.location.pathname);
    handleLinks()
    window.addEventListener('popstate', () => {
    renderRoute(window.location.pathname);
    });
}