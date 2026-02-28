import { getModal } from '../components/modal.js';

let tasks = [];

function getTasks(){
  let elements = ``;
  tasks.forEach(e => {
    let task = `<div class="task">
                  <h3>${e.title}</h1>
                  <p>${e.description}</p>
                  <span>Дата создания: ${e.date}</span>
                </div>`;
    elements = task + elements;
    
  })
  return elements;
}

export function pushTask(task){
  tasks.push(task);
  const tasksBlock = document.querySelector('.tasksBlock');
  tasksBlock.innerHTML = getTasks();
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