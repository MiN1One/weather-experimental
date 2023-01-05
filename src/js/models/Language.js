export let lang;

const langState = Array.from(document.querySelectorAll('.navigation__state'));
const langStateR = Array.from(document.querySelectorAll('.navigation__r-state'));
const en = document.querySelector('#en');
const de = document.querySelector('#de');
const enR = document.querySelector('#r-en');
const deR = document.querySelector('#r-de');

const check = r => {
    if (r) {
        setTimeout(() => {
            if (enR.checked) {
                enFunc(true);
            } else if (deR.checked) {
                deFunc(true);
            };
        }, 1000);
    } else {
        setTimeout(() => {
            if (en.checked) {
                enFunc(false);
            } else if (de.checked) {
                deFunc(false);
            };
        }, 1000);
    }
};

export const getLangOnLoad = () => {
    check();
    check(true);
};

export const getLang = () => {

    langState.forEach(el => {
        el.addEventListener('click', () => {
            check();
        });
    });

    langStateR.forEach(el => {
        el.addEventListener('click', () => {
            check(true);
        });
    });
};

const enFunc = r => {
    lang = 'en';
    document.getElementById('lang').textContent = 'EN';
    document.getElementById('lang-r').textContent = 'EN';
    if (r) {
        en.checked = true;
    } else {
        enR.checked = true;
    }
};

const deFunc = r => {
    lang = 'de';
    document.getElementById('lang').textContent = 'DE';
    document.getElementById('lang-r').textContent = 'DE';
    if (r) {
        de.checked = true;
    } else {
        deR.checked = true;
    }
};