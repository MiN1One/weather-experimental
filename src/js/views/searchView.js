import { elements } from './base';
import * as Search from '../models/Search';
import * as Language from '../models/Language';

let today = new Date();

export const formatTime = () => {
    let mins = today.getMinutes();
    let hours = today.getHours();
    if (mins < 10) {
        mins = `0${mins}`;
    }
    if (hours < 10) {
        hours = `0${hours}`
    }
    return `${hours} : ${mins}`
};

export const formatDate = lang => {
    let months;
    if (lang === 'de') months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    else months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = today.getMonth();
    let date = today.getDate();
    let ending;
    if (lang !== 'de') {
        if (String(date).endsWith('1')) ending = 'st';
        else if (String(date).endsWith('2')) ending = 'nd'; 
        else if (String(date).endsWith('3')) ending = 'rd'; 
        else ending = 'th'
        return `${months[month]} ${date}${ending}`;
    } else return `${months[month]} ${date}`;
}

const limitDes = (description, limit = 17) => {
    const newDes = [];
    if (description.length > limit) {
        description.split(' ').reduce((a, cur) => {
            if (a + cur.length <= limit) {
                newDes.push(cur);
            }
            else return a + cur.length;
        }, 0);
        return `${newDes.join(' ')} ..`;
    }
    else return description;
};

const fixDesSpace = description => {
    if (description.length > 17) return 'style="width:20rem"';
    else return '';
};

// e.g. date = 2020-05-22
export const convertToWeekday = (date, lang = 'en') => {
    const dayOfWeek = new Date(date).getDay();
    const month = new Date(date).getMonth();
    const date1 = new Date(date).getDate();
    if (lang === 'en') {
        return isNaN(dayOfWeek) ? null : 
        `${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]} ${month + 1}/${date1}`;
    } else if (lang === 'de') {
        return isNaN(dayOfWeek) ? null : 
        `${['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][dayOfWeek]} ${month + 1}/${date1}`;
    }
};

const formatLocation = location => {
    if (location.endsWith('.')) return location.replace(/\./g, '');
    return location;
};

const formatWind = string => {
    if (string.includes('-')) {
        const all = string.split('-');
        const format = all.join(' to ');
        return format.charAt(0).toUpperCase() + format.slice(1);
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
};

let utcTimeZoneRaw = today.getTimezoneOffset() / 60;
let utcTimeZone;
if (utcTimeZoneRaw <= 0) utcTimeZone = Math.abs(utcTimeZoneRaw)
else utcTimeZone = utcTimeZoneRaw;

const timeZoneString = () => {
    if (utcTimeZone > 0) return `+${utcTimeZone}`
    else return `-${utcTimeZone}`;
};

const formatSunriseTime = (rise, format = 24) => {
    let sunrise = rise.split(':');
    let sunriseHours;
    
    if (utcTimeZoneRaw > 0) {
        sunriseHours = parseInt(sunrise[0]) - utcTimeZone;
    } else {
        sunriseHours = parseInt(sunrise[0]) + utcTimeZone;
    };
    
    if (sunriseHours > format) {
        const differenceRise = sunriseHours - format;

        if (differenceRise < 10) return `0${differenceRise}:${sunrise[1]}`
        else return `${differenceRise}:${sunrise[1]}`;

    } else return `${sunriseHours}:${sunrise[1]}`;
};

const formatSunsetTime = (set, format = 24) => {
    let sunset = set.split(':');
    let sunsetHours;

    if (utcTimeZoneRaw > 0) {
        sunsetHours = parseInt(sunset[0]) - utcTimeZone;
    } else {
        sunsetHours = parseInt(sunset[0]) + utcTimeZone;
    };

    if (sunsetHours > format) {
        const differenceSet = sunsetHours - format;

        if (differenceSet < 10) return `0${differenceSet}:${sunset[1]}` 
        else return `${differenceSet}:${sunset[1]}`;

    } else return `${sunsetHours}:${sunset[1]}`;
};

const formatWindDirIcon = (windDir) => {
    if (windDir.includes(' to northwest')) return 'w-weather-wind-nw';
    if (windDir.includes(' to nordwestlich')) return 'w-weather-wind-nw';
    if (windDir.includes(' to northeast')) return 'w-weather-wind-ne';
    if (windDir.includes(' to nordost')) return 'w-weather-wind-ne';
    if (windDir.includes(' to southeast')) return 'w-weather-wind-se';
    if (windDir.includes(' to südöstlich')) return 'w-weather-wind-se';
    if (windDir.includes(' to southwest')) return 'w-weather-wind-sw';
    if (windDir.includes(' to südwesten')) return 'w-weather-wind-sw';
    if (windDir === 'West') return 'w-weather-wind-w';
    if (windDir === 'Westen') return 'w-weather-wind-w';
    if (windDir === 'East') return 'w-weather-wind-e';
    if (windDir === 'Osten') return 'w-weather-wind-e';
    if (windDir === 'North') return 'w-weather-wind-n';
    if (windDir === 'Norden') return 'w-weather-wind-n';
    if (windDir === 'South') return 'w-weather-wind-s';
    if (windDir === 'Süd') return 'w-weather-wind-s';
    if (windDir === 'Northeast') return 'w-weather-wind-ne';
    if (windDir === 'Nordost') return 'w-weather-wind-ne';
    if (windDir === 'Northwest') return 'w-weather-wind-nw';
    if (windDir === 'Nordwestlich') return 'w-weather-wind-nw';
    if (windDir === 'Southeast') return 'w-weather-wind-se';
    if (windDir === 'Südöstlich') return 'w-weather-wind-se';
    if (windDir === 'Southwest') return 'w-weather-wind-sw';
    if (windDir === 'Südwestlich') return 'w-weather-wind-sw';
    return 'w-weather-wind-n';
};

const expandDes = des => {
    if (des.length > 17) { return `<span class="data__title-exp">${des}</span>` }
    else { return ''; } 
};

export const displayData = d => {
    if (d) elements.dataContainer.style.display = 'grid'
    else elements.dataContainer.style.display = 'none';
};

export const clearInput = () => elements.searchField.value = "";
export const getInput = () => elements.searchField.value;
export const clearLocation = () => elements.location.innerHTML = "";
export const clearConditions = () => elements.conditions.innerHTML = "";
export const clearMain = () => elements.mainData.innerHTML = "";
export const clearDetails = () => elements.details.innerHTML = "";
export const clearForecast = () => elements.forecast.innerHTML = "";

export const clearAll = lang => {
    displayData(false);
    clearInput();
    clearLocation();
    clearConditions();
    clearMain();
    clearDetails();
    clearForecast();
    renderSuggestion(true, lang);
    renderBtns(false);
    renderHint();
};

export const prepareUI = () => {
    displayData(true);
    renderSuggestion();
    clearInput();
    clearLocation();
    clearConditions();
    clearMain();
    clearDetails();
    clearForecast();
    renderHint();
    renderBtns();
    renderSpinner(true);
};

export const addUIElements = (noSwipe) => {
    if (noSwipe) {
        renderHint(true);
        renderBtns(true);
    } else {
        addSwiper();
        renderHint(true);
        renderBtns(true);
    }
};

// *************************************************************
// *************************************************************
// *************************************************************
// *************************************************************

export const renderData = (data, forecastData, lang) => {
    renderLocation(data, lang);
    renderConditions(data);
    renderMain(data);
    renderDetails(data, forecastData);
    forecastData.slice(0, 14).forEach(renderForecast);
};

const renderLocation = (data, lang) => {
    const markUp = `
        <span class="a-0">
            <svg class="data__pin a-0">
            <use xlink:href="resources/icons/sprite.svg#basic_pin2"></use>
            </svg>
            <span class="data__search-for">Search within</span>
        </span>
        <span class="data__l-main a-0">${formatLocation(data.city_name)}, ${Search.parseCountryCodes(data.country_code, lang)}</span>
    `;
    elements.location.insertAdjacentHTML("afterbegin", markUp);
};

const renderConditions = data => {
    const markUp = `
        <span class="data__state a-0 a-4" ${fixDesSpace(data.weather.description)}>${data.weather.description}</span>
        <span class="data__substate a-0 a-4">${formatDate(Language.lang)}</span>
        <span class="data__sep a-0 a-4">|</span>
        <span class="data__substate data__substate--time a-0 a-4">${formatTime()}</span>
    `;
    elements.conditions.insertAdjacentHTML('afterbegin', markUp);
};

const renderMain = data => {
    const markUp = `
        <svg class="data__icon a-0 a-4">
            <use xlink:href="resources/icons/sprite.svg#${data.weather.icon}"></use>
        </svg>
        <span class="data__temp a-0 a-4">${Math.ceil(data.temp)}&deg;C</span>
        <span class="data__real a-0 a-4">&sim;<span class="data__real--text">Real feel</span> ${data.app_temp}&deg;</span>
    `;
    elements.mainData.insertAdjacentHTML('afterbegin', markUp);
};

const renderDetails = (data, f) => {
    const markUp = `
        <li class="data__item a-0">
            <span class="data__icons w-weather-cloud-drop"></span>
            <span class="data__title">Precipitation</span>
            <span class="data__in data__in--precip">${f[0].pop}%</span>
        </li>

        <li class="data__item a-0 a-1">
            <span class="data__icons arrows-move-bottom"></span>
            <span class="data__title">Pressure</span>
            <span class="data__in data__in--pres">${Math.round(data.pres)} mb</span>
        </li>

        <li class="data__item a-0 a-2">
            <span class="data__icons w-weather-cloud"></span>
            <span class="data__title">Cloud cover</span>
            <span class="data__in data__in--cloud">~${data.clouds}%</span>
        </li>

        <li class="data__item a-0 a-3">
            <span class="data__icons w-weather-wind"></span>
            <span class="data__title">Wind speed</span>
            <span class="data__in data__in--wspeed">${Math.round(data.wind_spd)} m/s</span>
        </li>

        <li class="data__item a-0 a-4">
            <span class="data__icons ${formatWindDirIcon(formatWind(data.wind_cdir_full))} data__compass"></span>
            <span class="data__title">Wind direction</span>
            <span class="data__in data__in--wdirection">${formatWind(data.wind_cdir_full)}</span>
        </li>

        <li class="data__item a-0 a-5">
            <span class="data__icons w-weather-drop"></span>
            <span class="data__title">Humidity</span>
            <span class="data__in data__in--humid">${data.rh}%</span>
        </li>

        <li class="data__item a-0 a-6">
            <div class="data__icon-box">
                <span class="data__icons w-weather-sunset"></span>
                <span class="data__icons w-weather-sundown"></span>
            </div>
            <span class="data__title">Sunrise/set</span>
            <span class="data__in data__in--minmax">${formatSunriseTime(data.sunrise)}, ${formatSunsetTime(data.sunset)}</span>
            <div class="data__sunriseset">
                <span class="data__text">Time is calculated in accordance with your local timezone</span>
                <span class="data__timeoffset">UTC ${timeZoneString()}</span>
            </div>
        </li>

        <li class="data__item a-0 a-7">
            <span class="data__icons w-weather-sun"></span>
            <span class="data__title">UV-index</span>
            <span class="data__in data__in--uv">${Math.round(data.uv)}</span>
        </li>

        <li class="data__time a-0 a-8">Last observation time: ${data.ob_time}</li>
    `;
    elements.details.insertAdjacentHTML('afterbegin', markUp);
};

const renderForecast = (day, i) => {
    const markUp = `
    <li class="data__item-f swiper-slide fade">
        <span class="data__title-f"><span class="data__title-f data__title--day">${convertToWeekday(day.valid_date, Language.lang)}</span></span>
        <svg class="data__icons-f">
            <use xlink:href="resources/icons/sprite.svg#${day.weather.icon}"></use>
        </svg>
        <button class="data__title-f data__condition-f">${limitDes(day.weather.description)}${expandDes(day.weather.description)}</button>
        <span class="data__in-f data__in-f--0">${day.high_temp}&deg; / ${day.min_temp}&deg;</span>
    </li>
    `;
    elements.forecast.insertAdjacentHTML('beforeend', markUp);
};

export const renderBtns = (render) => {
    if (render) {
        const markUpBtn = `
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>    
        `;
        elements.forecastBox.insertAdjacentHTML('beforeend', markUpBtn);
    } else {
        const next = document.querySelector('.swiper-button-next');
        const prev = document.querySelector('.swiper-button-prev');
        if (next, prev) {
            next.parentElement.removeChild(next);
            prev.parentElement.removeChild(prev);
        }
    }
};

export const renderHint = (render) => {
    if (render) {
        const markUp = `
            <svg class="data__hint-i">
                <use xlink:href="resources/icons/sprite.svg#arrows_left_double-32"></use>
            </svg>
            <div class="data__hint-l"></div>
            <span class="data__hint-t">14-day forecast</span>
            <div class="data__hint-l"></div>
            <svg class="data__hint-i">
                <use xlink:href="resources/icons/sprite.svg#arrows_right_double-31"></use>
            </svg>
        `;
        elements.hint.insertAdjacentHTML('afterbegin', markUp);
    } else elements.hint.innerHTML = "";
};


export const addSwiper = () => {
    $(document).ready(function() {
        var swiper = new Swiper('.data__forecast', {
            slidesPerView: 7,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                250: {
                    slidesPerView: 2,
                },
                300: {
                    slidesPerView: 3,
                },
                400: {
                    slidesPerView: 4,
                },
                736: {
                    slidesPerView: 6,
                },
                950: {
                    slidesPerView: 7,
                }
            }
        });
    })
};

export const renderSpinner = (render) => {
    if (render) {
        const markUp = `
            <svg class="main__loader">
                <use xlink:href="resources/icons/sprite.svg#arrows_anticlockwise_dashed"></use>
            </svg>
        `;
        elements.misc.insertAdjacentHTML('afterbegin', markUp);
        elements.misc.style.padding = '4rem 0';
    } else {
        elements.misc.innerHTML = '';
        elements.misc.style.padding = '0';
    }
};

export const renderSuggestion = (render, lang) => {
    let markUp;
    if (render) {
        if (lang === 'de') {
            markUp = `
                <svg class="main__icon">
                    <use xlink:href="resources/icons/sprite.svg#basic_pin2"></use>
                </svg>
                <span class="main__text">Suchen Sie nach Ihrer Region, um Wetterdaten abzurufen...</span>
            `;
        } else {
            markUp = `
                <svg class="main__icon">
                    <use xlink:href="resources/icons/sprite.svg#basic_pin2"></use>
                </svg>
                <span class="main__text">Search for your region to retrieve weather data...</span>
            `;
        }
        elements.misc.insertAdjacentHTML('afterbegin', markUp);
        elements.misc.style.padding = '4rem 0';
    } else {
        elements.misc.innerHTML = '';
        elements.misc.style.padding = '0';
    }
};