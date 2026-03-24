import Task from './task.js'
import { initTasks } from '../pages/tasks.js';
import { initTasksHome } from '../pages/home.js'

export function openModal(){
  const modalBtn = document.getElementById('showModalBtn');
  const modal = document.getElementById('modal');
  modalBtn.addEventListener('click', () => {
    modal.showModal();
  })
}

export function closeModal(){
    const cancelBtn = document.getElementById('resetModal');
    cancelBtn.addEventListener('click', () => {
        modal.close(); 
    });
}

export function addTask(){
    const addTaskBtn = document.getElementById('addTaskBtn');
    addTaskBtn.addEventListener('click', (e) => {
        const taskForm = document.forms.taskForm;
        if(taskForm.title.style.borderColor === 'red' && taskForm.title.value !== ''){
                    taskForm.title.style.borderColor = 'black';
        }
        if(taskForm.description.style.borderColor === 'red' && taskForm.description.value !== ''){
                    taskForm.description.style.borderColor = 'black';
        }
        if (taskForm.title.value === '' || taskForm.description.value === ''){
            e.preventDefault()
            if (taskForm.title.value === ''){
                taskForm.title.style.borderColor = 'red';
            }
            if (taskForm.description.value === ''){
                taskForm.description.style.borderColor = 'red';
            }
            return;
        }
        const task = new Task(Date.now(), taskForm.title.value, taskForm.description.value, taskForm.priority.value);
        let tasks = [];
        const saved = localStorage.getItem('tasks');
        tasks = saved ? JSON.parse(saved) : [];
        tasks.push(task.getTask());
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(window.location.pathname);
        if(window.location.pathname === '/') initTasksHome();
        if(window.location.pathname === '/tasks') initTasks();
        taskForm.reset();
    });
}

export function getModal(){
    let modalHtml = `
        <dialog id="modal">
            <form method="dialog" name="taskForm" class="modalForm">
                <p class="modalInputs">
                    <label>
                        <p>Название задачи: <input type="text" name="title" autofocus class="modalInput"></p>
                    </label>
                    <label>
                        <p>Описание: <input type="text" name="description" autofocus class="modalInput"></p>
                    </label>
                    <label>
                        Приоритет:
                        <p><input type="radio" name="priority" autofocus value="3"> Низкий</p>
                        <p><input type="radio" name="priority" autofocus value="2" checked> Средний</p>
                        <p><input type="radio" name="priority" autofocus value="1"> Высокий</p>
                    </label>
                </p>
                <menu>
                    <button type="reset" id="resetModal" class="modalBtn">Отмена</button>
                    <button type="submit" id="addTaskBtn" class="modalBtn">Добавить</button>
                </menu>
            </form>
        </dialog>
    `
    return modalHtml;
}