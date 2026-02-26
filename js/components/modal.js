export function closeModal(){
    const cancelBtn = document.getElementById('resetModal');
    cancelBtn.addEventListener('click', () => {
        modal.close(); 
    });
}

export function addTask(){
    const addTaskBtn = document.getElementById('addTaskBtn');
    addTaskBtn.addEventListener('click', () => {
        const newTask = document.forms.taskForm;
        console.log(newTask.elements);
    });
}

export function getModal(){
    let modalHtml = `
        <dialog id="modal">
            <form method="dialog" name="taskForm" class="modalForm">
                <p>
                    <label>
                        Название задачи:
                        <input type="text" name="title" autofocus>
                    </label>
                    <label>
                        Описание:
                        <input type="text" name="description" autofocus>
                    </label>
                    <label>
                        Приоритет:
                        <input type="radio" name="priority" autofocus>
                    </label>
                </p>
                <menu>
                    <button type="reset" id="resetModal">Отмена</button>
                    <button type="submit" id="addTaskBtn">Добавить</button>
                </menu>
            </form>
        </dialog>
    `
    return modalHtml;
}