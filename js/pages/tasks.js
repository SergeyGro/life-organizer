import { getModal } from '../components/modal.js';

let tasks = [{
            id: 1,
            title: 'Задача',
            description: 'Нужно сделать дело',
            completed: false,
            date: '2026-2-25',
            priority: '2',
            isEditing: false
        },{
            id: 2,
            title: 'Задача 2',
            description: 'Нужно сделать дело 2',
            completed: true,
            date: '2026-2-27',
            priority: '3',
            isEditing: false
        },{
            id: 3,
            title: 'задача 3',
            description: 'Нужно сделать дело 3',
            completed: false,
            date: '2026-2-3',
            priority: '1',
            isEditing: false
        },{
            id: 4,
            title: 'задача 4',
            description: 'Нужно сделать дело 4',
            completed: true,
            date: '2026-3-4',
            priority: '2',
            isEditing: false
        },{
            id: 5,
            title: 'задача 5',
            description: 'Нужно сделать дело 5',
            completed: false,
            date: '2026-1-4',
            priority: '1',
            isEditing: false
        },{
            id: 6,
            title: 'задача 6',
            description: 'Нужно сделать дело 6',
            completed: false,
            date: '2026-3-6',
            priority: '3',
            isEditing: false
        }];

let filter = [{
              value: 'all',
              stasus: true
            },{
              value: 'active',
              stasus: false
            },{
              value: 'completed',
              stasus: false
            }];

let sortMonitor = {
  date: false,
  priority: false
}

function getTasks(){
  let activeElements = ``;
  let inactiveElements = ``;
  let result = '';
  if (tasks.length === 0){
    return 'Добавьте задачу';
  } else {
    let activeTask = tasks.filter(e => !e.completed);
    let inactiveTask = tasks.filter(e => e.completed);
    if (activeTask.length > 0) {
      activeTask.forEach(e => {
      let task = `<div class="task ${taskDone(e.completed)}" data-id="${e.id}">
                    <div class="taskContentBLock">
                      <h3>${e.isEditing ? `<input type="text" class="editTaskInput" id="editTitle" value="${e.title}">` : e.title}</h1>
                      <p>Описание: ${e.isEditing ? `<input type="text" class="editTaskInput" id="editDescription" value="${e.description}">` : e.description}</p>
                      <p>Приоритет: ${e.isEditing ? `<p><input type="radio" name="priority" class="inputPriority" autofocus value="3" ${e.priority === '3' ? 'checked' : ''}> Низкий</p>
                                                      <p><input type="radio" name="priority" class="inputPriority" autofocus value="2" ${e.priority === '2' ? 'checked' : ''}> Средний</p>
                                                      <p><input type="radio" name="priority" class="inputPriority" autofocus value="1" ${e.priority === '1' ? 'checked' : ''}> Высокий</p>` : priorityValue(e.priority)}</p>
                      <p>Дата создания: ${e.date}</p>
                    </div>
                    <div class="taskBtnBLock">
                      <button type="reset" class="deleteTask" data-id="${e.id}">X</button>
                      <button class="editTask" data-id="${e.id}">${editTaskValue(e.isEditing)}</button>
                      <input type="checkbox" class="completed" data-id="${e.id}">
                    </div>
                  </div>`;
      activeElements = activeElements + task;             
      })
    }
    if (inactiveTask.length > 0) {
      inactiveTask.forEach(e => {
      let task = `<div class="task ${taskDone(e.completed)}" data-id="${e.id}">
                    <div class="taskContentBLock">
                      <h3>${e.isEditing ? `<input type="text" class="editTaskInput" id="editTitle" value="${e.title}">` : e.title}</h1>
                      <p>Описание: ${e.isEditing ? `<input type="text" class="editTaskInput" id="editDescription" value="${e.description}">` : e.description}</p>
                      <p>Приоритет: ${e.isEditing ? `<p><input type="radio" name="priority" class="inputPriority" autofocus value="3" ${e.priority === '3' ? 'checked' : ''}> Низкий</p>
                                                      <p><input type="radio" name="priority" class="inputPriority" autofocus value="2" ${e.priority === '2' ? 'checked' : ''}> Средний</p>
                                                      <p><input type="radio" name="priority" class="inputPriority" autofocus value="1" ${e.priority === '1' ? 'checked' : ''}> Высокий</p>` : priorityValue(e.priority)}</p>
                      <p>Дата создания: ${e.date}</p>
                    </div>
                    <div class="taskBtnBLock">
                      <button type="reset" class="deleteTask" data-id="${e.id}">X</button>
                      <button class="editTask" data-id="${e.id}">${editTaskValue(e.isEditing)}</button>
                      <input type="checkbox" class="completed" data-id="${e.id}">
                    </div>
                  </div>`;
      inactiveElements = inactiveElements + task;             
      })
    }
  }
  filter.forEach(e => {
    if(e.value === 'all' && e.stasus === true){
      if (activeElements === '') result = `<div class="inactiveTaskBlock">${inactiveElements}</div>`;
      if (inactiveElements === '') result = `<div class="activeTaskBlock">${activeElements}</div>`;
      result = `<div class="activeTaskBlock">${activeElements}</div>
              <div class="inactiveTaskBlock">${inactiveElements}</div>`;
    }
    if(e.value === 'active' && e.stasus === true){
      if (activeElements === ''){
        result = 'Нет активных задач';
      } else {
        result = `<div class="activeTaskBlock">${activeElements}</div>`;
      }
    }
    if(e.value === 'completed' && e.stasus === true){
      if (inactiveElements === ''){
        result = 'Нет выполненых задач';
      } else {
        result = `<div class="inactiveTaskBlock">${inactiveElements}</div>`;
      }
    }
  })
  return result;
}

function renderTasksBlock(){
  const tasksBlock = document.querySelector('.tasksBlock');
  tasksBlock.innerHTML = getTasks();
  deleteTask();
  taskComplete();
  editTask();
  changeCounterTask();
}

export function pushTask(task){
  tasks.push(task);
  renderTasksBlock();
}

function priorityValue(value){
  if(value === "1") return 'Высокий';
  if(value === "2") return 'Средний';
  if(value === "3") return 'Низкий';
}

export function deleteTask(){
  const btn = document.querySelectorAll('.deleteTask');
  btn.forEach((e) => {
    e.addEventListener('click', (el) => {
    const result = confirm('Вы уверены что хотите удалить задачу?');
    if (result) {
      tasks = tasks.filter(task => task.id !== Number(el.target.dataset.id));
      renderTasksBlock();
    }
    return;
    });
  })
}

export function taskComplete(){
  // Проверить как будет работать с сохранением данных
  const checkbox = document.querySelectorAll('.completed');
  checkbox.forEach((e) => {
    e.addEventListener('change', (el) => {
    tasks = tasks.map(task => {
      if (task.id === Number(el.target.dataset.id)) return { ...task, completed: !task.completed};
      return task;
    });
    renderTasksBlock();
    });
  })
}

function taskDone(e){
  if (e === true){
    return 'taskDone';
  } else {
    return '';
  }
}

export function editTask(){
  const btn = document.querySelectorAll('.editTask');
  btn.forEach((e) => {
    e.addEventListener('click', (el) => {
      const taskId = Number(el.target.dataset.id);
      tasks = tasks.map(task => {
        if (task.id === taskId) {
          if(task.isEditing === false) return { ...task, isEditing: true };
          if(task.isEditing === true){
            const newTitle = document.getElementById('editTitle');
            const newDescription = document.getElementById('editDescription');
            const newPriority = document.querySelector('.inputPriority:checked');
            return { 
              ...task,
              title: newTitle.value,
              description: newDescription.value,
              priority: newPriority.value,
              isEditing: false,
            };
          }
        }
        return task;
      })
      renderTasksBlock();
    })
  })
}

function editTaskValue(e){
  if (e === false) return 'Редактировать';
  if (e === true) return 'Сохранить';
}

function counterTask(){
  let counter = 0;
  tasks.forEach(e => {
    if (e.completed === false) counter = counter + 1;
  })
  return counter;
}

function changeCounterTask() {
  const showCounter = document.getElementById('counterTask');
  return showCounter.innerHTML = `${counterTask()}`;
}

export function filterTasks(){
  const filterTasksForm = document.forms.filterTasksForm;
  filterTasksForm.radioFilter.forEach(e => e.addEventListener('change', () => {
    filter = filter.map(el => {
      if (e.value === el.value){
        return {
          ...el,
          stasus: true
        }
      } else {
        return {
            ...el,
            stasus: false
          }
      }
    })
    renderTasksBlock();
  }))
}

export function sortTasks(){
  const sortDateBtn = document.getElementById('sortDateBtn');
  const sortPriorityBtn = document.getElementById('sortPriorityBtn');
  sortDateBtn.addEventListener('click', () => {
    if (sortMonitor.date === false) {
      tasks.sort((a,b) => {
        let x = new Date(a.date),
            y = new Date(b.date);
        return x - y;
      })
    } else {
      tasks.sort((a,b) => {
        let x = new Date(a.date),
            y = new Date(b.date);
        return y - x;
      })
    }
    sortMonitor.date = !sortMonitor.date;
    renderTasksBlock();
  })
  sortPriorityBtn.addEventListener('click', () => {
    if (sortMonitor.priority === false) {
      tasks.sort((a,b) => {
        return a.priority - b.priority;
      })
    } else {
      tasks.sort((a,b) => {
        return b.priority - a.priority;
      })
    }
    sortMonitor.priority = !sortMonitor.priority;
    renderTasksBlock();
  })
}

export function openModal(){
  const modalBtn = document.getElementById('showModalBtn');
  const modal = document.getElementById('modal');
  modalBtn.addEventListener('click', () => {
    modal.showModal();
  })
}

export function renderTasks(){
    let tasksBlock = `<div class="tasks">
                        <h1>Задачи</h1>
                        <button id="showModalBtn">Добавить задачу</button>
                        <div class="menuTasks">
                          <h3>Активные задачи: <span id="counterTask">${counterTask()}</span></h3>
                          <div>
                            <form name="filterTasksForm">
                              <p><input name="radioFilter" type="radio" value="all" checked> Все</p>
                              <p><input name="radioFilter" type="radio" value="active"> Активные</p>
                              <p><input name="radioFilter" type="radio" value="completed"> Выполненые</p>
                            </form>
                          </div>
                          <menu>
                              <button id="sortDateBtn">Дата</button>
                              <button id="sortPriorityBtn">Приоритет</button>
                          </menu>
                        </div>
                        <div class="tasksBlock">
                          ${getTasks()}
                        </div>
                        ${getModal()}
                      </div>`;
    return tasksBlock;
};