export default class Task {
    constructor(id, title, description, priority){
        this.id = id,
        this.title = title,
        this.description = description,
        this.completed = false,
        this.date= this.getDate(),
        this.priority = priority,
        this.isEditing = false
    }
    getTask(){
        const task = {
            id: this.id,
            title: this.title,
            description: this.description,
            completed: this.completed,
            date: this.date,
            priority: this.priority,
            isEditing: this.isEditing
        }
        return task
    }
    getDate(){
        const date = new Date();
        return date.toISOString().split('T')[0];
    }
}