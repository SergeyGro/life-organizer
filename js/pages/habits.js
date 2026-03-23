import Habit from '../components/habit.js';

let habits = [];

function getHabits(){
    let habitsElemets = '';
    if (habits.length === 0){
        return 'Добавьте привычку';
    } else {
        habits.forEach(e => { 
            let habit = `<div class="habit" data-id="${e.id}">
                    <div class="habitContentBLock">
                        <h3>${e.name}</h3>
                        <p>Текущая серия: ${e.streak}</p>
                    </div>
                    ${renderWeekProgress(e)}
                    <menu>
                        <button type="reset" class="deleteHabit" data-id="${e.id}">X</button>
                        <label class="mark-label">
                            <input type="checkbox" class="markHabit" data-id="${e.id}" ${e.marker ? 'checked' : ''}>
                            <span>Отметить сегодня</span>
                        </label>
                    </menu>
                  </div>`;
            habitsElemets = habitsElemets + habit;
        })
    }
    return habitsElemets;
}

function renderHabitsBlock(){
    const habitsBlock = document.querySelector('.habitsBlock');
    habitsBlock.innerHTML = getHabits();
    deleteHabit();
    markHabit();
    saveHabits();
}

export function initHabits(){
    loadHabits();
    habits.forEach(habit => initHistory(habit));
    renderHabitsBlock();
    addHabit();
}

function addHabit(){
    const addform = document.forms.addHabitForm;
    addform.addHabitkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (addform.addHabitInput.value === '') alert('Введите название привычки');
        if (addform.addHabitInput.value !== '') {
            let habit = new Habit(addform.addHabitInput.value);
            habit.getHistory();
            habits.push(habit.getHabit());
            addform.addHabitInput.value = '';
            renderHabitsBlock();
        }
    })
}

function deleteHabit(){
    const btn = document.querySelectorAll('.deleteHabit');
    btn.forEach((e) => {
        e.addEventListener('click', (el) => {
            const result = confirm('Вы уверены что хотите удалить привычку?');
            if (result) {
            habits = habits.filter(habit => habit.id !== Number(el.target.dataset.id)
        );
        renderHabitsBlock();
    }
    return;
    });
  })
}

function initHistory(habit){
    const today = new Date();
    const keysHistory = Object.keys(habit.history).sort();
    if (keysHistory.length === 0) return;
    const oldestDate = new Date(keysHistory[0]);
    let currentDate = new Date(oldestDate);
    if (!habit.history[today.toISOString().split('T')[0]]) habit.marker = false;
    while (currentDate <= today) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (!habit.history[dateStr]) {
            habit.history[dateStr] = false;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return habit;
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
            renderHabitsBlock();
        })
    })
}

function countingStreak(habit){
    let streak = 0;
    let currentDate = new Date();
    while (true) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const value = habit.history[dateStr];
        if (value === true) {
            streak++;
        } else {
            break;
        }
        currentDate.setDate(currentDate.getDate() - 1);
    }
    return habit.streak = streak;
}

function getLastDays() {
    const days = [];
    const today = new Date();
  
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        days.push({
            date: dateStr,
            dayOfWeek: date.toLocaleDateString('ru-RU', { weekday: 'short' }),
            dayNumber: date.getDate()
        });
    }
    return days;
}

function renderWeekProgress(habit) {
    const lastDays = getLastDays();
    return `
        <div class="weekProgress">
            <div class="weekDays">
                ${lastDays.map(day => `
                <div class="dayCell" data-date="${day.date}">
                    <div class="dayLabel">${day.dayOfWeek}</div>
                    <div class="dayNumber">${day.dayNumber}</div>
                    <div class="dayStatus ${getStatusClass(habit, day.date)}"></div>
                </div>
            `).join('')}
            </div>
        </div>
    `;
}

function getStatusClass(habit, date) {
    const status = habit.history[date];
    if (status === true) return 'completed';
    if (status === false) return 'missed';
    return 'pending';
}

function saveHabits(){
    localStorage.setItem('habits', JSON.stringify(habits));
}

function loadHabits(){
    const saved = localStorage.getItem('habits');
    habits = saved ? JSON.parse(saved) : [];
}

export function renderHabits(){
    let habitsBlock = `<div class="habits">
                        <h1>Привычки</h1>
                        <form name="addHabitForm">
                            <input name="addHabitInput" type="text" autofocus class="addHabitInput" placeholder="Новая привычка">
                            <button class="addHabitkBtn" name="addHabitkBtn">Добавить</button>
                        </form>
                        <div class="habitsBlock">
                        </div>
                    </div>`;
    return habitsBlock;
}