import { getModal } from '../components/modal.js';
import task from '../components/task.js'

let tasks = [];

function getTasks(){
  let elements = ``;
  tasks.forEach(e => {
    let task = `<div class="task">
                  <h3>${e.title}</h1>
                  <p>${e.description}</p>
                  <span>Дата создания: ${e.createdAt}</span>
                </div>`;
    elements = task + elements;
  })
  return elements;
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