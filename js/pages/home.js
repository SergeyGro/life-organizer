import { getModal, openModal, closeModal, addTask } from '../components/modal.js';
import { countingStreak } from './habits.js';

let tasks = [];
let habits = [];
let quotes = [
    {'Наполеон Хилл': 'Все, что человеческий разум способен понять и во что он способен поверить, достижимо.'},
    {'Амелия Эрхарт': 'Сложнее всего начать действовать, все остальное зависит только от упорства.'},
    {'Борис Стругацкий': 'Начинать всегда стоит с того, что сеет сомнения.'},
    {'Крис Гроссер': 'Возможности не приходят сами — вы создаете их.'},
    {'Генри Форд': 'Неудача — это возможность начать заново, но уже более мудро.'},
    {'Уолт Уитмен': 'Всегда смотрите на солнце — и тени будут позади вас.'},
    {'Абай Кунанбаев': 'Если я полон решимости, я преодолею любое препятствие.'},
    {'Элеонора Рузвельт': 'Обстоятельства часто можно изменить, изменив свое отношение к ним.'},
    {'Габриэль Гарсиа Маркес': 'Вдохновение приходит только во время работы.'},
    {'Карл Густав Юнг': 'Все, что раздражает в других, может вести к пониманию себя.'},
    {'Далай-лама XIV': 'Если проблему можно решить, не стоит о ней беспокоиться.'},
    {'Махатма Ганди': 'Сила не зависит от физических возможностей. Ее источник — неукротимая воля.'},
    {'Артур Гордон Линклеттер': 'Если что-то вообще стоит пробовать, это стоит попробовать не меньше 10 раз.'},
    {'Долли Партон': 'Если вам не нравится дорога, по которой вы идете, начните прокладывать другую.'}
]

export function initHome(){
    loadTask();
    loadHabits();
    sayHi();
    getRandomQuote();
    renderStatistics();
    renderHabitsProgress();
    openModal();
    closeModal();
    addTask();
    markHabit();
}

export function initTasksHome(){
    loadTask();
    renderStatistics();
}

function sayHi(){
    const greeting = document.querySelector('.greeting');
    const now = new Date().getHours();
    if(now >= 4 && now <= 11){
        return greeting.innerHTML = 'Доброе утро!';
    } else if (now >= 12 && now <= 17){
        return greeting.innerHTML = 'Добрый день!';
    } else if (now >= 18 && now <= 23){
        return greeting.innerHTML = 'Добрый вечер!';
    } else {
        return greeting.innerHTML = 'Доброй ночи!';
    }
}

function loadTask(){
    const saved = localStorage.getItem('tasks');
    tasks = saved ? JSON.parse(saved) : [];
}

function loadHabits(){
    const saved = localStorage.getItem('habits');
    habits = saved ? JSON.parse(saved) : [];
}

function counterTask(value){
    let counter = 0;
    tasks.forEach(e => {
        if (value === false){
            if (e.completed === false) counter = counter + 1;
        } else {
            if (e.completed === true) counter = counter + 1;
        }
    })
    return counter;
}

function renderStatistics(){
    const completedStat = document.getElementById('completedStat');
    const notCompletedStat = document.getElementById('notCompletedStat');
    completedStat.innerHTML = `${counterTask(true)}`;
    notCompletedStat.innerHTML = `${counterTask(false)}`;
}

function getHabitsProgress(){
    const today = new Date().toISOString().split('T')[0];
    let marked = [];
    let notMarked = [];
    habits.forEach(habit => {
        if(habit.history[today] === true){
            marked.push(habit);
        } else {
            notMarked.push(habit);
        }
    })
    let markedElements = '';
    let notMarkedElements = '';
    if(marked.length !== 0){
        marked.forEach(e => {
            let habit = `
                        <div class="habitHome">
                            <p>${e.name}</p>
                            <p>Серия: ${e.streak}</p>
                        </div>`
            markedElements = markedElements + habit;
        })
    }
    if(notMarked.length !== 0){
        notMarked.forEach(e => {
            let habit = `
                        <div class="habitHome">
                            <p>${e.name}</p>
                            <label class="mark-label">
                                <input type="checkbox" class="markHabit" data-id="${e.id}" ${e.marker ? 'checked' : ''}>
                                <span>Отметить сегодня</span>
                            </label>
                        </div>`
            notMarkedElements = notMarkedElements + habit;
        })
    }
    if(markedElements === ''){
        return `<div class"markedHabits">Отмеченые: Нет</div>
                <div class"notMarkedHabits">
                    <h4>Не отмеченые: </h4>
                    <div class="habitsHome">
                        ${notMarkedElements}
                    </div>
                </div>`;
    } else if(notMarkedElements === ''){
        return `<div class"markedHabits">
                    <h4>Отмеченые: </h4>
                    <div>
                        ${markedElements}
                    </div>
                </div>
                <div class"notMarkedHabits">Не отмеченые: Нет</div>`;
    } else {
        return `<div class"markedHabits">
                    <h4>Отмеченые: </h4>
                    <div>
                        ${markedElements}
                    </div>
                </div>
                <div class"notMarkedHabits">
                    <h4>Не отмеченые: </h4>
                    <div>
                        ${notMarkedElements}
                    </div>
                </div>`
    }
}

function renderHabitsProgress(){
    const habitsProgress = document.querySelector('.habitsProgress');
    
    habitsProgress.innerHTML = getHabitsProgress();
}

function getRandomQuote(){
    const quoteElem = document.getElementById('quote');
    const authorQuoteElem = document.getElementById('authorQuote');
    let num = Math.floor(Math.random() * 13);
    let quote = quotes[num];
    for(let key in quote){
        quoteElem.innerHTML = key;
        authorQuoteElem.innerHTML = quote[key];
    }
}

function markHabit(){
    const checkbox = document.querySelectorAll('.markHabit');
    checkbox.forEach(e => {
        e.addEventListener('change', () => {
            habits = habits.map(habit => {
                const date = new Date();
                const dateStr = date.toISOString().split('T')[0];
                if(habit.id === parseInt(e.dataset.id)){
                    if(habit.marker === false){
                        habit.history[dateStr] = true;
                        habit.marker = true;
                    } else {
                        habit.history[dateStr] = false;
                        habit.marker = false;
                    }
                    countingStreak(habit);
                    return habit
                } else {
                    return habit;
                }
            })
            localStorage.setItem('habits', JSON.stringify(habits));
            renderHabitsProgress();
        })
    })
}

export function renderHome(){
    let homeBlock = `<div class="home">
                        <h1 class="greeting"></h1>
                        <div>
                            <div>    
                                <h3>Статистика задач: 
                                    Выполнено - <span id="completedStat"></span>
                                    Осталось - <span id="notCompletedStat"></span>
                                </h3>
                            </div>
                            <div>
                                <h3>Прогресс по привычкам не сегодня</h3>
                                <div class="habitsProgress">
                                </div>
                            </div>
                        </div>
                        <div class="quotes">
                            <p id="quote"></p>
                            <p id="authorQuote"></p>
                        </div>
                        <button id="showModalBtn">Добавить задачу</button>
                    </div> 
        ${getModal()}
    `
    return homeBlock;
}