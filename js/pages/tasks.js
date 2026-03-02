import { getModal } from '../components/modal.js';

let tasks = [{
            id: 1,
            title: 'this.title',
            description: 'this.description',
            completed: false,
            date: 'this.date',
            priority: 'this.priority'
        }];

function getTasks(){
  let elements = ``;
  tasks.forEach(e => {
    let task = `<div class="task ${taskDone(e.completed)}" data-id="${e.id}">
                  <h3>${e.title}</h1>
                  <p>Описание: ${e.description}</p>
                  <p>Приоритет: ${e.priority}</p>
                  <p>Дата создания: ${e.date}</p>
                  <div>
                    <button type="reset" class="deleteTask" data-id="${e.id}">X</button>
                    <button type="submit" class="completedBtn" data-id="${e.id}">Выполнено</button>
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
  taskComplete()
}

export function pushTask(task){
  tasks.push(task);
  renderTasksBlock();
}

export function deleteTask(){
  const btn = document.querySelectorAll('.deleteTask');
  btn.forEach((e) => {
    e.addEventListener('click', (e) => {
    tasks = tasks.filter(task => task.id !== Number(e.target.dataset.id));
    renderTasksBlock();
    });
  })
}

export function taskComplete(){
  const btn = document.querySelectorAll('.completedBtn');
  btn.forEach((e) => {
    e.addEventListener('click', (e) => {
    tasks = tasks.map(task => {
      if (task.id === Number(e.target.dataset.id)) return { ...task, completed: !task.completed};
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