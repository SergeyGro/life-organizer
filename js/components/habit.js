export default class Habit {
    constructor(name){
        this.id = Date.now(),
        this.name = name,
        this.streak = 0,
        this.history = []
    }
    getHabit(){
        const habit = {
            id: this.id,
            name: this.name,
            streak: this.streak,
            history: this.history
        }
        return habit
    }
}