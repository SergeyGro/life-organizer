import { getModal } from '../components/modal.js';

let tasks = [{
            id: 1,
            title: 'this.title',
            description: 'this.description',
            completed: false,
            date: 'this.date',
            priority: 'this.priority',
            isEditing: false
        }];

function getTasks(){
  let elements = ``;
  tasks.forEach(e => {
    let task = `<div class="task ${taskDone(e.completed)}" data-id="${e.id}">
                  <div class="taskContentBLock">
                    <h3>${e.isEditing ? `<input type="text" class="editTaskInput" id="editTitle" value="${e.title}">` : e.title}</h1>
                    <p>Описание: ${e.isEditing ? `<input type="text" class="editTaskInput" id="editDescription" value="${e.description}">` : e.description}</p>
                    <p>Приоритет: ${e.priority}</p>
                    <p>Дата создания: ${e.date}</p>
                  </div>
                  <div class="taskBtnBLock">
                    <button type="reset" class="deleteTask" data-id="${e.id}">X</button>
                    <button class="editTask" data-id="${e.id}">${editTaskValue(e.isEditing)}</button>
                    <input type="checkbox" class="completed" data-id="${e.id}">
                  </div>
                </div>`;
    elements = task + elements;
    
  })
  return elements;
}

function renderTasksBlock(){
  const tasksBlock = document.querySelector('.tasksBlock');
  tasksBlock.innerHTML = getTasks();
  deleteTask();
  taskComplete();
  editTask();
}

export function pushTask(task){
  tasks.push(task);
  renderTasksBlock();
}

export function deleteTask(){
  const btn = document.querySelectorAll('.deleteTask');
  btn.forEach((e) => {
    e.addEventListener('click', (el) => {
    tasks = tasks.filter(task => task.id !== Number(el.target.dataset.id));
    renderTasksBlock();
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
            return { 
              ...task,
              title: newTitle.value,
              description: newDescription.value,
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
                        <div class="tasksBlock">
                          ${getTasks()}
                        </div>
                        ${getModal()}
                      </div>`;
    return tasksBlock;
};