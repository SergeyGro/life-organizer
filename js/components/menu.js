let statusMenu = true;
const resize = window.matchMedia('(max-width: 960px)');

const menu =`
    <button class="menuBtn closeMenuBtn"><i class="fas fa-bars"></i></button>
    <nav class="navHeader ${statusMenu ? 'openMenu' : ''}">
        <button class="menuBtn openMenuBtn"><i class="fas fa-times"></i></button>
        <ul class="ulNav">
            <li><a href="/" class="aNav"><i class="fas fa-home"></i> Главная</a></li>
            <li><a href="/tasks" class="aNav"><i class="fas fa-check-square"></i> Задачи</a></li>
            <li><a href="/habits" class="aNav"><i class="fas fa-fire"></i> Привычки</a></li>
            <li><a href="/about" class="aNav"><i class="fas fa-info-circle"></i> Информация</a></li>
        </ul>
    </nav>
    <div class="clickArea"></div>`;

function saveStatus(){
    localStorage.setItem('statusMenu', JSON.stringify(statusMenu));
}

function loadStatus(){
    const saved = localStorage.getItem('statusMenu');
    statusMenu = saved ? JSON.parse(saved) : true;
}

function changeStatus(){
    statusMenu = !statusMenu;
    saveStatus();
    menuBurger();
}

function handleResize(){
    resize.addEventListener('change', () => {
        if(statusMenu === true && resize.matches === true) changeStatus();
        if(statusMenu === true && resize.matches === false) changeStatus();
        if(statusMenu === false && resize.matches === false) changeStatus();
        return;
    });
}

function handleClick(){
    const btn = document.querySelectorAll('.menuBtn');
    const area = document.querySelector('.clickArea');
    btn.forEach(e => e.addEventListener('click', () => changeStatus()));
    area.addEventListener('click', () => changeStatus())
}

function menuBurger(){
    const header = document.getElementById('header');
    const main = document.getElementById('main');
    const footer = document.getElementById('footer');

    header.children[1].classList.toggle('openMenu', statusMenu);
    header.children[0].classList.toggle('showBtn', !statusMenu);
    if(resize.matches === true){
        main.classList.remove('layoutContent');
        footer.classList.remove('layoutContent');
        header.children[2].classList.toggle('clickAreaNone', statusMenu);
    } else {
        main.classList.toggle('layoutContent', statusMenu);
        footer.classList.toggle('layoutContent', statusMenu);
        header.children[2].classList.remove('clickAreaNone');
    }
}

export function currentLink(){
    header.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === window.location.pathname){
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    })
}

export default function getMenu(){
    loadStatus();
    const header = document.getElementById('header');
    header.innerHTML = menu;
    menuBurger();
    handleResize();
    handleClick();
    currentLink();
}