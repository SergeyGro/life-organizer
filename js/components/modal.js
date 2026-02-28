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
    addTaskBtn.addEventListener('click', () => {
        const taskForm = document.forms.taskForm;
        const task = new Task(Date.now(), taskForm.title.value, taskForm.description.value, taskForm.priority.value);
        pushTask(task.getTask());
    });
}

export function getModal(){
    let modalHtml = `
        <dialog id="modal">
            <form method="dialog" name="taskForm" class="modalForm">
                <p class="modalInputs">
                    <label>
                        <input type="text" name="title" autofocus placeholder="Название задачи" class="modalInput">
                    </label>
                    <label>
                        <input type="text" name="description" autofocus placeholder="Описание" class="modalInput">
                    </label>
                    <label>
                        Приоритет:
                        <input type="radio" name="priority" autofocus value="Низкий">
                        <input type="radio" name="priority" autofocus value="Средний" checked>
                        <input type="radio" name="priority" autofocus value="Высокий">
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