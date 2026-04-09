import { getModal, openModal, closeModal, addTask } from '../components/modal.js';

let tasks = [];

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

let foundTask = '';

function getTasks(){
  let activeElements = ``;
  let inactiveElements = ``;
  let result = '';
  if (tasks.length === 0){
    return 'Добавьте задачу';
  } else {
    let activeTask = tasks.filter(e => {
      if(foundTask === '') return !e.completed;
      if(foundTask !== '') return !e.completed && e.title.toLowerCase().includes(foundTask.toLowerCase());
    });
    let inactiveTask = tasks.filter(e => {
      if(foundTask === '') return e.completed;
      if(foundTask !== '') return e.completed && e.title.toLowerCase().includes(foundTask.toLowerCase());
    });
    if (activeTask.length > 0) {
      activeTask.forEach(e => {
      let task = `<div class="task" data-id="${e.id}">
                    <div class="taskContentBLock">
                      <h3 class="taskTitle">${e.isEditing ? `<input type="text" class="editTaskInput" id="editTitle" value="${e.title}">` : e.title}</h3>
                      <p class="taskDescription">Описание:<span class="taskDescriptionSpan">${e.isEditing ? `<input type="text" class="editTaskInput" id="editDescription" value="${e.description}">` : e.description}</span></p>
                      <p>Приоритет: ${e.isEditing ? `<select class="editTaskSelect">
                                                        <option value="3">Низкий</option>
                                                        <option value="2">Средний</option> 
                                                        <option value="1">Высокий</option>   
                                                      </select>` : priorityValue(e.priority)}</p>
                      <p>Дата создания: ${e.date}</p>
                    </div>
                    <div class="taskBtnBLock">
                      <button type="reset" class="deleteTask deleteBtn" data-id="${e.id}">&#215;</button>
                      <button class="editTask ${e.isEditing ? 'saveEditTask' : 'editingTask'}" data-id="${e.id}">${e.isEditing ? editTaskValue(true) : editTaskValue(false)}</button>
                      <input type="checkbox" id="taskCheck" class="completed" data-id="${e.id}">
                    </div>
                  </div>`;
      activeElements = activeElements + task;             
      })
    }
    if (inactiveTask.length > 0) {
      inactiveTask.forEach(e => {
      let task = `<div class="task taskDone" data-id="${e.id}">
                    <div class="taskContentBLock">
                      <h3 class="taskTitle">${e.isEditing ? `<input type="text" class="editTaskInput" id="editTitle" value="${e.title}">` : e.title}</h3>
                      <p>Описание: ${e.isEditing ? `<input type="text" class="editTaskInput" id="editDescription" value="${e.description}">` : e.description}</p>
                      <p>Приоритет: ${e.isEditing ? `<select class="editTaskSelect">
                                                        <option value="3">Низкий</option>
                                                        <option value="2">Средний</option> 
                                                        <option value="1">Высокий</option>   
                                                      </select>` : priorityValue(e.priority)}</p>
                      <p>Дата создания: ${e.date}</p>
                    </div>
                    <div class="taskBtnBLock">
                      <button type="reset" class="deleteTask deleteBtn" data-id="${e.id}">&#215;</button>
                      <button class="editTask ${e.isEditing ? 'saveEditTask' : 'editingTask'}" data-id="${e.id}">${e.isEditing ? editTaskValue(true) : editTaskValue(false)}</button>
                      <input type="checkbox" id="taskCheck" class="completed" data-id="${e.id}" checked>
                    </div>
                  </div>`;
      inactiveElements = inactiveElements + task;             
      })
    }
  }
  filter.forEach(e => {
    if(e.value === 'all' && e.stasus === true){
      if (activeElements === ''){
        result = `<div class="inactiveTaskBlock">${inactiveElements}</div>`;
      } else if (inactiveElements === ''){
        result = `<div class="activeTaskBlock">${activeElements}</div>`;
      } else {
        result = `<div class="activeTaskBlock">${activeElements}</div>
                <div class="inactiveTaskBlock">${inactiveElements}</div>`;
      }
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

export function renderTasksBlock(){
  loadTask();
  const tasksBlock = document.querySelector('.tasksBlock');
  tasksBlock.innerHTML = getTasks();
  deleteTask();
  taskComplete();
  editTask();
  changeCounterTask();
}

export function initTasks(){
  renderTasksBlock();
  openModal();
  closeModal();
  addTask();
  filterTasks();
  sortTasks();
  searchTask();
}

function saveTasks(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTask(){
  const saved = localStorage.getItem('tasks');
  tasks = saved ? JSON.parse(saved) : [];
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
      saveTasks();
      renderTasksBlock();
    }
    return;
    });
  })
}

export function taskComplete(){
  const checkbox = document.querySelectorAll('.completed');
  checkbox.forEach((e) => {
    e.addEventListener('change', (el) => {
    tasks = tasks.map(task => {
      if (task.id === Number(el.target.dataset.id)) return { ...task, completed: !task.completed};
      return task;
    });
    saveTasks();
    renderTasksBlock();
    });
  })
}

// function taskDone(e){
//   if (e === true){
//     return 'taskDone';
//   } else {
//     return '';
//   }
// }

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
            const newPriority = document.querySelector('.editTaskSelect');
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
      saveTasks();
      renderTasksBlock();
    })
  })
}

function editTaskValue(e){
  if (e === false) return '&#128396;';
  if (e === true) return 'Сохранить';
}

function counterTask(value){
  let counter = 0;
  if(value){
    tasks.forEach(e => {
      if (e.completed === false) counter = counter + 1;
    })
  } else {
    tasks.forEach(e => {
      if (e.completed === true) counter = counter + 1;
    })
  }
  return counter;
}

function changeCounterTask(){
  const counterTaskActive = document.getElementById('counterTaskActive');
  const counterTaskDone = document.getElementById('counterTaskDone');
  counterTaskActive.innerHTML = `${counterTask(true)}`;
  counterTaskDone.innerHTML = `${counterTask(false)}`;
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
    saveTasks();
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
    saveTasks();
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
    saveTasks();
    renderTasksBlock();
  })
}

export function searchTask(){
  const searchForm = document.forms.searchTaskForm;
  searchForm.searchTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    foundTask = searchForm.searchTaskInput.value;
    saveTasks();
    renderTasksBlock();
  })
}

export function renderTasks(){
  let tasksBlock = `<div class="tasks">
                      <h1>Задачи</h1>
                      <button id="showModalBtn">Добавить задачу</button>
                      <div class="menuTasks">
                        <div class="counterTaskBlock">
                          <h2>Активные задачи: <span id="counterTaskActive"></span></h2>
                          <h2>Выполненые задачи: <span id="counterTaskDone"></span></h2>
                        </div>
                        <div class="filterTasksBlock">
                          <h2>Фильтровать</h2>
                          <form name="filterTasksForm">
                            <p><input name="radioFilter" type="radio" value="all" checked> Все</p>
                            <p><input name="radioFilter" type="radio" value="active"> Активные</p>
                            <p><input name="radioFilter" type="radio" value="completed"> Выполненые</p>
                          </form>
                        </div>
                        <menu class="sortTasksMenu">
                            <button id="sortDateBtn" class="sortTasksBtn">Дата</button>
                            <button id="sortPriorityBtn" class="sortTasksBtn">Приоритет</button>
                        </menu>
                        <form name="searchTaskForm" id="searchTaskForm">
                            <input name="searchTaskInput" type="text" autofocus class="searchTaskInput" placeholder="Поиск задачи">
                            <button class="searchTaskBtn" name="searchTaskBtn">Искать</button>
                        </form>
                      </div>
                      <div class="tasksBlock">
                        
                      </div>
                      ${getModal()}
                    </div>`;
  return tasksBlock;
};