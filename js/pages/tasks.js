import { getModal } from '../components/modal.js';

let tasks = [{
            id: 1,
            title: 'Задача',
            description: 'Нужно сделать дело',
            completed: false,
            date: '2026.2.25',
            priority: 'Средний',
            isEditing: false
        },{
            id: 2,
            title: 'Задача 2',
            description: 'Нужно сделать дело 2',
            completed: true,
            date: '2026.2.27',
            priority: 'Низкий',
            isEditing: false
        },{
            id: 3,
            title: 'задача 3',
            description: 'Нужно сделать дело 3',
            completed: false,
            date: '2026.3.3',
            priority: 'Высокий',
            isEditing: false
        },{
            id: 4,
            title: 'задача 4',
            description: 'Нужно сделать дело 4',
            completed: true,
            date: '2026.3.4',
            priority: 'Средний',
            isEditing: false
        },{
            id: 5,
            title: 'задача 5',
            description: 'Нужно сделать дело 5',
            completed: false,
            date: '2026.3.4',
            priority: 'Высокий',
            isEditing: false
        },{
            id: 6,
            title: 'задача 6',
            description: 'Нужно сделать дело 6',
            completed: false,
            date: '2026.3.6',
            priority: 'низкий',
            isEditing: false
        }];

// function getTasks(){
//   let elements = ``;
//   if (tasks.length === 0){
//     elements = 'Добавьте задачу';
//   } else {
//     tasks.forEach(e => {
//       let task = `<div class="task ${taskDone(e.completed)}" data-id="${e.id}">
//                     <div class="taskContentBLock">
//                       <h3>${e.isEditing ? `<input type="text" class="editTaskInput" id="editTitle" value="${e.title}">` : e.title}</h1>
//                       <p>Описание: ${e.isEditing ? `<input type="text" class="editTaskInput" id="editDescription" value="${e.description}">` : e.description}</p>
//                       <p>Приоритет: ${e.isEditing ? `<p><input type="radio" name="priority" class="inputPriority" autofocus value="Низкий" ${e.priority === 'Низкий' ? 'checked' : ''}> Низкий</p>
//                                                       <p><input type="radio" name="priority" class="inputPriority" autofocus value="Средний" ${e.priority === 'Средний' ? 'checked' : ''}> Средний</p>
//                                                       <p><input type="radio" name="priority" class="inputPriority" autofocus value="Высокий" ${e.priority === 'Высокий' ? 'checked' : ''}> Высокий</p>` : e.priority}</p>
//                       <p>Дата создания: ${e.date}</p>
//                     </div>
//                     <div class="taskBtnBLock">
//                       <button type="reset" class="deleteTask" data-id="${e.id}">X</button>
//                       <button class="editTask" data-id="${e.id}">${editTaskValue(e.isEditing)}</button>
//                       <input type="checkbox" class="completed" data-id="${e.id}">
//                     </div>
//                   </div>`;
//       elements = elements + task;             
//     })
//   }
//   return elements;
// }

function getTasks(){
  let activeElements = ``;
  let inactiveElements = ``;
  // let active = `<div class="activeTaskBlock"></div>`;
  // let inactive = `<div class="inactiveTaskBlock"></div>`;
  if (tasks.length === 0){
    return 'Добавьте задачу';
  } else {
    let activeTask = tasks.filter(e => !e.completed);
    let inactiveTask = tasks.filter(e => e.completed);
    // console.log(activeTask, inactiveTask);
    if (activeTask.length > 0) {
      activeTask.forEach(e => {
      let task = `<div class="task ${taskDone(e.completed)}" data-id="${e.id}">
                    <div class="taskContentBLock">
                      <h3>${e.isEditing ? `<input type="text" class="editTaskInput" id="editTitle" value="${e.title}">` : e.title}</h1>
                      <p>Описание: ${e.isEditing ? `<input type="text" class="editTaskInput" id="editDescription" value="${e.description}">` : e.description}</p>
                      <p>Приоритет: ${e.isEditing ? `<p><input type="radio" name="priority" class="inputPriority" autofocus value="Низкий" ${e.priority === 'Низкий' ? 'checked' : ''}> Низкий</p>
                                                      <p><input type="radio" name="priority" class="inputPriority" autofocus value="Средний" ${e.priority === 'Средний' ? 'checked' : ''}> Средний</p>
                                                      <p><input type="radio" name="priority" class="inputPriority" autofocus value="Высокий" ${e.priority === 'Высокий' ? 'checked' : ''}> Высокий</p>` : e.priority}</p>
                      <p>Дата создания: ${e.date}</p>
                    </div>
                    <div class="taskBtnBLock">
                      <button type="reset" class="deleteTask" data-id="${e.id}">X</button>
                      <button class="editTask" data-id="${e.id}">${editTaskValue(e.isEditing)}</button>
                      <input type="checkbox" class="completed" data-id="${e.id}">
                    </div>
                  </div>`;
      activeElements = activeElements + task;             
      })
    }
    if (inactiveTask.length > 0) {
      inactiveTask.forEach(e => {
      let task = `<div class="task ${taskDone(e.completed)}" data-id="${e.id}">
                    <div class="taskContentBLock">
                      <h3>${e.isEditing ? `<input type="text" class="editTaskInput" id="editTitle" value="${e.title}">` : e.title}</h1>
                      <p>Описание: ${e.isEditing ? `<input type="text" class="editTaskInput" id="editDescription" value="${e.description}">` : e.description}</p>
                      <p>Приоритет: ${e.isEditing ? `<p><input type="radio" name="priority" class="inputPriority" autofocus value="Низкий" ${e.priority === 'Низкий' ? 'checked' : ''}> Низкий</p>
                                                      <p><input type="radio" name="priority" class="inputPriority" autofocus value="Средний" ${e.priority === 'Средний' ? 'checked' : ''}> Средний</p>
                                                      <p><input type="radio" name="priority" class="inputPriority" autofocus value="Высокий" ${e.priority === 'Высокий' ? 'checked' : ''}> Высокий</p>` : e.priority}</p>
                      <p>Дата создания: ${e.date}</p>
                    </div>
                    <div class="taskBtnBLock">
                      <button type="reset" class="deleteTask" data-id="${e.id}">X</button>
                      <button class="editTask" data-id="${e.id}">${editTaskValue(e.isEditing)}</button>
                      <input type="checkbox" class="completed" data-id="${e.id}">
                    </div>
                  </div>`;
      inactiveElements = inactiveElements + task;             
      })
    }
  }
  console.log(inactiveElements)
  if (activeElements === '') return `<div class="inactiveTaskBlock">${inactiveElements}</div>`;
  if (inactiveElements === '') return `<div class="activeTaskBlock">${activeElements}</div>`;
  return `<div class="activeTaskBlock">${activeElements}</div>
          <div class="inactiveTaskBlock">${inactiveElements}</div>`;
}

function renderTasksBlock(){
  const tasksBlock = document.querySelector('.tasksBlock');
  tasksBlock.innerHTML = getTasks();
  deleteTask();
  taskComplete();
  editTask();
  changeCounterTask();
}

export function pushTask(task){
  tasks.push(task);
  renderTasksBlock();
}

export function deleteTask(){
  const btn = document.querySelectorAll('.deleteTask');
  btn.forEach((e) => {
    e.addEventListener('click', (el) => {
    const result = confirm('Вы уверены что хотите удалить задачу?');
    if (result) {
      tasks = tasks.filter(task => task.id !== Number(el.target.dataset.id));
      renderTasksBlock();
    }
    return;
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
            const newPriority = document.querySelector('.inputPriority:checked');
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
      renderTasksBlock();
    })
  })
}

function editTaskValue(e){
  if (e === false) return 'Редактировать';
  if (e === true) return 'Сохранить';
}

function counterTask(){
  let counter = 0;
  tasks.forEach(e => {
    if (e.completed === false) counter = counter + 1;
  })
  return counter;
}

function changeCounterTask() {
  const showCounter = document.getElementById('counterTask');
  return showCounter.innerHTML = `${counterTask()}`;
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
                        <h3>Активные задачи: <span id="counterTask">${counterTask()}</span></h3>
                        <div class="tasksBlock">
                          ${getTasks()}
                        </div>
                        ${getModal()}
                      </div>`;
    return tasksBlock;
};