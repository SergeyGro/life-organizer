export default class Habit {
    constructor(name){
        this.id = Date.now(),
        this.name = name,
        this.streak = 0,
        this.history = {},
        this.marker = false
    }
    getHabit(){
        const habit = {
            id: this.id,
            name: this.name,
            streak: this.streak,
            history: this.history,
            marker: this.marker
        }
        return habit
    }
    getHistory(){
        const date = new Date();
        const dateStr= date.toISOString().split('T')[0];
        return this.history[dateStr] = false;
    }
}