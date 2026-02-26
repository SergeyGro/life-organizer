export default class Task {
    constructor(id, title, description, createdAt, priority){
        this.id= id,
        this.title= title,
        this.description= description,
        this.completed= false,
        this.createdAt= createdAt,
        this.priority= priority
    }
    getTask(){
        const task = `
            <div class="task">
                <h3>${this.title}</h1>
                <p>${this.description}</p>
                <span>Дата создания: ${this.createdAt}</span>
            </div>`
        return task;
    }
}