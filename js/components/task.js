export default class Task {
    constructor(id, title, description, priority){
        this.id = id,
        this.title = title,
        this.description = description,
        this.completed = false,
        this.date= this.getDate(),
        this.priority = priority
    }
    getTask(){
        const task = {
            id: this.id,
            title: this.title,
            description: this.description,
            completed: this.completed,
            date: this.date,
            priority: this.priority
        }
        return task
    }
    getDate(){
        let date = new Date();
        let dateStr = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
        return dateStr;
    }
}