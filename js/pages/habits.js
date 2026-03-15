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
                        <p>История выполнения: </p>
                    </div>
                    <div>
                        Визуализация последних 7 дней
                    </div>
                    <menu>
                        <button type="reset" class="deleteHabit" data-id="${e.id}">X</button>
                        <input type="checkbox" class="completed" data-id="${e.id}">
                    </menu>
                  </div>`;
            habitsElemets = habitsElemets + habit;
        })
    }
    return habitsElemets;
}

function initHabits(){
    const habitsBlock = document.querySelector('.habitsBlock');
    habitsBlock.innerHTML = getHabits();
    deleteHabit();
}

export function addHabit(){
    const addform = document.forms.addHabitForm;
    addform.addHabitkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (addform.addHabitInput.value === '') alert('Введите название привычки');
        if (addform.addHabitInput.value !== '') {
            let habit = new Habit(addform.addHabitInput.value);
            habits.push(habit.getHabit());
            addform.addHabitInput.value = '';
            initHabits();
        }
    })
}

function deleteHabit(){
  const btn = document.querySelectorAll('.deleteHabit');
  btn.forEach((e) => {
    e.addEventListener('click', (el) => {
    const result = confirm('Вы уверены что хотите удалить привычку?');
    if (result) {
      habits = habits.filter(habit => habit.id !== Number(el.target.dataset.id));
      initHabits();
    }
    return;
    });
  })
}

export function renderHabits(){
    let habitsBlock = `<div class="habist">
                        <h1>Привычки</h1>
                        <form name="addHabitForm">
                            <input name="addHabitInput" type="text" autofocus class="addHabitInput" placeholder="Новая привычка">
                            <button class="addHabitkBtn" name="addHabitkBtn">Добавить</button>
                        </form>
                        <div class="habitsBlock">
                        ${getHabits()}
                        </div>
                    </div>`;
    return habitsBlock;
}