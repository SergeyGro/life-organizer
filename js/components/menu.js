let menu = {
    'menu': `<nav class="navHeader">
            <ul class="ulNav">
                <li><a href="/" class="aNav">Главная</a></li>
                <li><a href="/tasks" class="aNav">Задачи</a></li>
                <li><a href="/habits" class="aNav">Привычки</a></li>
                <li><a href="/about" class="aNav">Информация</a></li>
            </ul>
        </nav>`,
    'burgerBtn': `<button>X</button>`,
    'menuBurger': `<nav class="navHeader">
            <ul class="ulNav">
                <li><a href="/" class="aNav">Главная</a></li>
                <li><a href="/tasks" class="aNav">Задачи</a></li>
                <li><a href="/habits" class="aNav">Привычки</a></li>
                <li><a href="/about" class="aNav">Информация</a></li>
            </ul>
        </nav>`
}

function renderMenu(menu){
    const header = document.getElementById('header');
    header.innerHTML = menu['menu'];
}

export default function getMenu(){
    renderMenu(menu);
}