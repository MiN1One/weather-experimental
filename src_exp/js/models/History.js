import { formatTime, formatDate } from '../views/searchView';
import { parseCountryCodes } from './Search';

export default class History {
    constructor() {
        this.history = [];
    }

    addHistory(location, data, forecast, id) {
        if (this.history.length <= 5 || this.history.length == 0) {
            const item = {
                location,
                data,
                forecast,
                country: parseCountryCodes(data.country_code),
                id,
                time: formatTime(),
                date: formatDate(),
            };
            this.history.push(item);
            this.saveHistory();
            return item;
        }
    }

    removeHistory(location) {
        const itemToRemove = this.history.findIndex(el => el.location === location);
        this.history.splice(itemToRemove, 1);
        this.saveHistory();
    }

    inHistory(location) {
        return this.history.findIndex(el => el.location === location) !== -1;
    }

    saveHistory() {
        localStorage.setItem('history', JSON.stringify(this.history));
    }

    readHistory() {
        const storage = JSON.parse(localStorage.getItem('history'));
        if (storage) this.history = storage
    }
}