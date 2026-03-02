import Task from './task.js'
import { pushTask } from '../pages/tasks.js';

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
        pushTask(task.getTask());
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
                        <p><input type="radio" name="priority" autofocus value="Низкий"> Низкий</p>
                        <p><input type="radio" name="priority" autofocus value="Средний" checked> Средний</p>
                        <p><input type="radio" name="priority" autofocus value="Высокий"> Высокий</p>
                    </label>
                </p>
                <menu >
                    <button type="reset" id="resetModal" class="modalBtn">Отмена</button>
                    <button type="submit" id="addTaskBtn" class="modalBtn">Добавить</button>
                </menu>
            </form>
        </dialog>
    `
    return modalHtml;
}