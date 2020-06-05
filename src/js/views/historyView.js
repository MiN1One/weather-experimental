import { elements } from './base';

const fixString = country => { 
    if (country == undefined) return '...';
    else return country;
};

const transformUppercase = string => {
    if (string.includes(' ')) {
        const arr = string.split(' ');

        if (arr.length === 2) {
            const arr1 = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
            const arr2 = arr[1].charAt(0).toUpperCase() + arr[1].slice(1);
            return arr1 + ' ' + arr2;
        } else if (arr.length === 3) {
            const arr1 = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
            const arr2 = arr[1].charAt(0).toUpperCase() + arr[1].slice(1);
            const arr3 = arr[2].charAt(0).toUpperCase() + arr[2].slice(1);
            return arr1 + ' ' + arr2 + ' ' + arr3;
        } else {
            const arr1 = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
            const arr2 = arr[1].charAt(0).toUpperCase() + arr[1].slice(1);
            const arr3 = arr[2].charAt(0).toUpperCase() + arr[2].slice(1);
            const arr4 = arr[3].charAt(0).toUpperCase() + arr[3].slice(1);
            return arr1 + ' ' + arr2 + ' ' + arr3 + ' ' + arr4;
        };

    } else return string.charAt(0).toUpperCase() + string.slice(1);
};

export const renderRecentList = (history, count, load) => {
    toggleRecentList();
    const lastElement = history.length - 1;

    if (load) history.slice(0, 5).forEach(el => addRecentLocation(el));
    else if (count == 5) {
        elements.recentList.innerHTML = "";
        history.slice(0, 5).forEach(el => addRecentLocation(el));
        addRecentTitle();
    } else if (count <= 5) {
        addRecentLocation(history[lastElement]);
    };
};

const addRecentTitle = () => {
    const markUp = `
        <li class="navigation__recent-items">Recent search</li>
    `;
    elements.recentList.insertAdjacentHTML('beforeend', markUp);
};

const toggleRecentList = () => {
    const list = '.navigation__recent-list';
    
    elements.searchField.addEventListener('focusin', () => {
        if ($(list).is(':hidden')) $(list).slideDown();
    });
    elements.searchField.addEventListener('focusout', () => {
        $(list).slideUp();
    });
};

const addRecentLocation = (history) => {
    const markUp = `
        <li class="navigation__recent-item">
            <a href="#${history.id}" class="navigation__recent-link">${transformUppercase(history.location)}, ${fixString(history.country)}</a>
        </li>
    `;
    elements.recentList.insertAdjacentHTML('afterbegin', markUp);
};