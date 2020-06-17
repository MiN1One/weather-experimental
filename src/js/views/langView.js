import { lang } from '../models/Language';

export const translateContent = () => {
    if (lang === 'de') {
        translateToDE();
    } else if (lang === 'en') {
        translateToEN();
    }
};

const arrNodesN = Array.from(document.querySelectorAll('.navigation__title'));

// ****************** DEUTSCH *******************

const translateToDE = () => {
    const arrNodesD = Array.from(document.querySelectorAll('.data__title'));
    
    // MAIN 
    d('real--text').textContent = 'Echtes Gefühl';
    d('search-for').textContent = 'Suche ist in';
    d('text').textContent = 'Die Zeit wird gemäß Ihrer lokalen Zeitzone berechnet';
    d('hint-t').textContent = '14-Tage-Prognose';

    // DETAILS
    arrNodesD[0].textContent = 'Niederschlag';
    arrNodesD[1].textContent = 'Druck';
    arrNodesD[2].textContent = 'Wolkendecke';
    arrNodesD[3].textContent = 'Windgeschwindigkeit';
    arrNodesD[4].textContent = 'Windrichtung';
    arrNodesD[5].textContent = 'Feuchtigkeit';
    arrNodesD[6].textContent = 'Sonnenaufgang/unter';
    arrNodesD[7].textContent = 'UV-Index';
    
    // NAVIGATION / TOOLTIPS
    arrNodesN[0].textContent = 'Drucken';
    arrNodesN[1].textContent = 'Klar';
    arrNodesN[2].textContent = 'Aktualisieren';

    n('hint').innerHTML = `Wählen Sie das<br>Landschaftslayout`;
    n('hint--update').innerHTML = `Aktualisieren Sie, wenn<br>Sie die Sprache ändern`;

    // NAVIGATION / SEARCH BAR
    n('recent-items').textContent = 'Aktuelle Suchanfragen';
    n('search-field').placeholder = 'Suchen Sie nach Ihrem Standort';

    // GRID FIX
    const fixGridMedia = (media) => {
        if (media.matches) {
            d('list').style.cssText = 'grid-template-columns: repeat(2, 1fr)!important;grid-template-rows: repeat(4, max-content)!important;grid-gap: 1rem!important;';
        } else {
            d('list').style.cssText = 'grid-template-columns: repeat(4, 1fr)!important;grid-template-rows: repeat(2, max-content)!important;grid-gap: 1rem!important;';
            d('item').style.cssText = 'padding: .5rem!important';
        }
    };

    const media = matchMedia('(max-width: 39.375em)');
    fixGridMedia(media);
    media.addEventListener('change', fixGridMedia);

    // FOOTER 
    document.querySelector('.footer').innerHTML = '<p>WeatherApp&copy; 2020. Angetrieben von <a href="https://www.weatherbit.io/" class="footer__link">WeatherBit.</a> Entwickelt von <a href="https://t.me/MiN1One" class="footer__link">MiN1One</a> nur für Lernzwecke.</p>';
};

// ****************** ENGLISH *******************

const translateToEN = () => {
    // MAIN

    // MAIN / DETAILS

    // NAVIGATION / TOOLTIPS
    arrNodesN[0].textContent = 'Print';
    arrNodesN[1].textContent = 'Clear';
    arrNodesN[2].textContent = 'Update';

    n('hint').innerHTML = 'Choose landscape<br>layout';
    document.querySelector('.navigation__hint--update').innerHTML = `Update when you<br>change language.`;

    // NAVIGATION / SEARCH BAR
    n('recent-items').textContent = 'Recent searches';
    n('search-field').placeholder = 'Search for your location';

    // GRID FIX
    d('list').style.removeProperty('grid-template-columns');
    d('list').style.removeProperty('grid-template-rows');
    d('list').style.removeProperty('grid-gap');

    const fixGridMedia = (media) => {
        if (media.matches) {
            d('list').style.cssText = 'grid-template-columns: repeat(4, 1fr)!important; grid-template-rows: repeat(2, max-content)!important; grid-gap: 1rem!important;';
            d('item').style.cssText = 'padding: .5rem 1.3rem!important';
        } else {
            d('list').style.cssText = 'grid-template-columns: repeat(8, max-content)!important;grid-template-rows: max-content;grid-gap: 0!important;';
            d('item').style.cssText = 'padding: .5rem 1.3rem!important';
        }
    };

    const fixGridMediaSmall = (media) => {
        if (media.matches) {
            d('list').style.cssText = 'grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(2, max-content); grid-gap: 1rem;';
            d('item').style.cssText = 'padding: .5rem 1.3rem';
        } else {
            d('list').style.cssText = 'grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(4, max-content); justify-content: space-evenly;';
            d('list').style.cssText = 'padding: .5rem 1.3rem';
        }
    };

    const mediaSmall = matchMedia('(min-width: 23.6875em)');
    fixGridMediaSmall(mediaSmall);
    mediaSmall.addEventListener('change', fixGridMediaSmall);

    const media = matchMedia('(max-width: 53.4375em)');
    fixGridMedia(media);
    media.addEventListener('change', fixGridMedia);

    // FOOTER
    document.querySelector('.footer').innerHTML = '<p>WeatherApp&copy; 2020. Powered by <a href="https://www.weatherbit.io/" class="footer__link">WeatherBit.</a> Developed only for learn-in-practice purposes by <a href="https://t.me/MiN1One" class="footer__link">MiN1One.</a></p>'
};

const d = s => {
    return document.querySelector(`.data__${s}`);
};

const n = s => {
    return document.querySelector(`.navigation__${s}`);
};