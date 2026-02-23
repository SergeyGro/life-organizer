const routes = {
    '/': '<h1>Главная</h1><p>Добро пожаловать!</p>',
    '/tasks': '<h1>Задачи</h1><p>Список задач будет здесь</p>',
    '/habits': '<h1>Привычки</h1><p>Трекер привычек</p>',
    '/about': '<h1>О нас</h1><p>Версия 1.0</p>'
}

function renderRoute(path) {
    let normalizedPath = path;
    if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
        normalizedPath = normalizedPath.slice(0, -1);
    }
    const app = document.getElementById('app');
    if (routes[normalizedPath]) {
    app.innerHTML = routes[normalizedPath];
    } else {
    app.innerHTML = '<h1>404</h1><p>Такой страницы нет</p>';
    }
}

function handleLinks() {
    document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
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