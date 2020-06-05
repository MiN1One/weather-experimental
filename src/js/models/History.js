import { formatTime, formatDate } from '../views/searchView';

export default class History {
    constructor() {
        this.history = [];
    }

    addHistory(location, country, id) {
        const item = {
            location,
            country,
            id
        };
        this.history.push(item);
        this.saveHistory();
    }

    limitHistory(location, country, id) {
        if (this.history.length < 5 || this.history.length == 0) this.addHistory(location, country, id);
        else if (this.history.length == 5) {
            this.history.splice(0, 1);
            this.addHistory(location, country, id);
        };
    }

    removeHistory(location) {
        const itemToRemove = this.history.findIndex(el => el.location === location);
        this.history.splice(itemToRemove, 1);
        this.saveHistory();
    }

    saveHistory() {
        localStorage.setItem('myoneWeather', JSON.stringify(this.history));
        console.log(localStorage.getItem('myoneWeather'));
    }

    readHistory() {
        const storage = JSON.parse(localStorage.getItem('myoneWeather'));
        if (storage !== null) this.history = storage;
    }

    countHistory() {
        return this.history.length;
    }

    inHistory(location) {
        // if (this.history.length > 0) {
        //     const index = this.history.findIndex(el => el.location === location);
        //     if (this.history[index] !== location) return true;
        //     else return false;
        // } else return true;
        return this.history.findIndex(el => el.location === location) !== -1;
    }
};