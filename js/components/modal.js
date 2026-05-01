import Task from './task.js'
import { renderTasksBlock } from '../pages/tasks.js';
import { renderStatistics } from '../pages/home.js'

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
        if(window.location.pathname === '/life-organizer' || window.location.pathname === '/') renderStatistics();
        if(window.location.pathname === '/life-organizer/tasks') renderTasksBlock();
        taskForm.reset();
    });
}

export function getModal(){
    let modalHtml = `
        <dialog id="modal">
            <form method="dialog" name="taskForm" class="modalForm">
                <div class="modalInputBlock">
                    <label for="title">Название</label>
                    <input type="text" id="title" name="title" autofocus class="modalInput">
                </div>
                <div class="modalInputBlock">
                    <label for="description">Описание</label>
                    <input type="text" id="description" name="description" autofocus class="modalInput">
                </div>
                <div class="modalInputBlock">
                    <label for="priority">Приоритет</label>
                    <select class="modalPriority" id="priority" name="priority">
                        <option value="3">Низкий</option>
                        <option value="2" selected>Средний</option> 
                        <option value="1">Высокий</option>
                    </select>
                </div>

                <div class="modalBtnMenu">
                    <input type="reset" id="resetModal" class="modalBtn" value="Отмена">
                    <input type="submit" id="addTaskBtn" class="modalBtn" value="Добавить">
                </div>
            </form>
        </dialog>
    `
    return modalHtml;
}