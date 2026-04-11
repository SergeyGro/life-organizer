let menu = {
    'menu': `<nav class="navHeader">
            <ul class="ulNav">
                <li><a href="/" class="aNav"><i class="fas fa-home"></i> Главная</a></li>
                <li><a href="/tasks" class="aNav"><i class="fas fa-check-square"></i> Задачи</a></li>
                <li><a href="/habits" class="aNav"><i class="fas fa-fire"></i> Привычки</a></li>
                <li><a href="/about" class="aNav"><i class="fas fa-info-circle"></i> Информация</a></li>
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

export default function getMenu(){
    const header = document.getElementById('header');
    header.innerHTML = menu['menu'];
}