import { elements } from './base';
import * as Search from '../models/Search';

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
}

export const formatDate = () => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = today.getMonth();
    let date = today.getDate();
    let ending;
    if (String(date).charAt(1) === '1') ending = 'st';
    else if (String(date).charAt(1) === '2') ending = 'nd'; 
    else if (String(date).charAt(1) === '3') ending = 'rd'; 
    else ending = 'th'
    return `${months[month]} ${date}${ending}`;
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
}

// e.g. date = 2020-05-22
const convertToWeekday = date => {
    const dayOfWeek = new Date(date).getDay();
    const month = new Date(date).getMonth();
    const date1 = new Date(date).getDate();    
    return isNaN(dayOfWeek) ? null : 
    `${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]} ${month + 1}/${date1}`;
}

const formatLocation = location => {
    if (location.endsWith('.')) return location.replace(/\./g, '');
    return location;
}

const formatWind = string => {
    if (string.includes('-')) {
        const all = string.split('-');
        const format = all.join(' to ');
        return format.charAt(0).toUpperCase() + format.slice(1);
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const formatSunriseSetTime = (rise, set, format = 24) => {
    let utcTimeZone = Math.abs(today.getTimezoneOffset() / 60);
    let sunrise = rise.split(':');
    let sunset =  set.split(':');
    
    let sunriseHours = parseInt(sunrise[0]) + utcTimeZone;
    let sunsetHours = parseInt(sunset[0]) + utcTimeZone;
    if (sunriseHours > format) {
        const difference = sunriseHours - format;
        if (difference < 10) return `0${difference}:${sunrise[1]}, ${sunsetHours}:${sunset[1]}`;
        return `${difference}:${sunrise[1]}, ${sunsetHours}:${sunset[1]}`;
    }
    if (sunsetHours > format) {
        const difference1 = sunsetHours - format;
        if (difference1 < 10) return `0${difference1}:${sunrise[1]}, ${sunsetHours}:${sunset[1]}`;
        return `${difference1}:${sunrise[1]}, ${sunsetHours}:${sunset[1]}`;
    }
    return `${sunriseHours}:${sunrise[1]}, ${sunsetHours}:${sunset[1]}`;
}

const formatWindDirIcon = (windDir) => {
    if (windDir.includes(' to northwest')) return 'weather_wind_NW';
    if (windDir.includes(' to northeast')) return 'weather_wind_NE';
    if (windDir.includes(' to southeast')) return 'weather_wind_SE';
    if (windDir.includes(' to soutwest')) return 'weather_wind_SW';
    if (windDir === 'West') return 'weather_wind_W';
    if (windDir === 'East') return 'weather_wind_E';
    if (windDir === 'North') return 'weather_wind_N';
    if (windDir === 'South') return 'weather_wind_S';
    if (windDir === 'Northeast') return 'weather_wind_NE';
    if (windDir === 'Northwest') return 'weather_wind_NW';
    if (windDir === 'Southeast') return 'weather_wind_SE';
    if (windDir === 'Southwest') return 'weather_wind_SW';
    return 'weather_wind_N';
}

export const renderSuggestion = (render) => {
    if (render) {
        const markUp = `
            <svg class="main__icon">
                <use xlink:href="resources/icons/sprite.svg#basic_pin2"></use>
            </svg>
            Search for your region to retrieve weather data<span>...</span>
        `;
        elements.suggestion.insertAdjacentHTML('afterbegin', markUp);
    } else elements.suggestion.innerHTML = "";
};
export const clearInput = () => elements.searchField.value = "";
export const getInput = () => elements.searchField.value;
export const clearLocation = () => elements.location.innerHTML = "";
export const clearConditions = () => elements.conditions.innerHTML = "";
export const clearMain = () => elements.mainData.innerHTML = "";
export const clearDetails = () => elements.details.innerHTML = "";
export const clearForecast = () => elements.forecast.innerHTML = "";
export const clearAll = () => {
    clearInput();
    clearLocation();
    clearConditions();
    clearMain();
    clearDetails();
    clearForecast();
    renderBtns();
    renderHint();
    renderSuggestion('r');
};

export const renderData = (data, forecastData, lang) => {
    renderLocation(data, lang);
    renderConditions(data);
    renderMain(data);
    renderDetails(data, forecastData);
    forecastData.slice(0, 14).forEach(renderForecast);
}

const renderLocation = (data, lang) => {
    const markUp = `
        <span>
            <svg class="data__pin">
            <use xlink:href="resources/icons/sprite.svg#basic_pin2"></use>
            </svg>
            Search within
        </span>
        <span>${formatLocation(data.city_name)}, ${Search.parseCountryCodes(data.country_code, lang)}</span>
    `;
    elements.location.insertAdjacentHTML("afterbegin", markUp);
}

const renderConditions = data => {
    const markUp = `
        <span class="data__state">${data.weather.description}</span>
        <span class="data__substate">${formatDate()}</span>
        <span class="data__sep">|</span>
        <span class="data__substate data__substate--time">${formatTime()}</span>
    `;
    elements.conditions.insertAdjacentHTML('afterbegin', markUp);
}

const renderMain = data => {
    const markUp = `
        <svg class="data__icon">
            <use xlink:href="resources/icons/sprite.svg#${data.weather.icon}"></use>
        </svg>
        <span class="data__temp">${Math.ceil(data.temp)}&deg;C</span>
        <span class="data__real">&sim;Real feel ${data.app_temp}&deg;</span>
    `;
    elements.mainData.insertAdjacentHTML('afterbegin', markUp);
}

const renderDetails = (data, f) => {
    const markUp = `
        <li class="data__item">
            <svg class="data__icons">
                <use xlink:href="resources/icons/sprite.svg#weather_cloud_drop"></use>
            </svg>
            <span class="data__title">Precipitation</span>
            <span class="data__in data__in--precip">${f[0].pop}%</span>
        </li>

        <li class="data__item">
            <svg class="data__icons">
                <use xlink:href="resources/icons/sprite.svg#arrows_move_bottom"></use>
            </svg>
            <span class="data__title">Pressure</span>
            <span class="data__in data__in--pres">${Math.round(data.pres)} mb</span>
        </li>

        <li class="data__item">
            <svg class="data__icons">
                <use xlink:href="resources/icons/sprite.svg#weather_cloud"></use>
            </svg>
            <span class="data__title">Cloud cover</span>
            <span class="data__in data__in--cloud">~${data.clouds}%</span>
        </li>

        <li class="data__item">
            <svg class="data__icons">
                <use xlink:href="resources/icons/sprite.svg#weather_wind"></use>
            </svg>
            <span class="data__title">Wind speed</span>
            <span class="data__in data__in--wspeed">${Math.round(data.wind_spd)} m/s</span>
        </li>

        <li class="data__item">
            <svg class="data__icons">
                <use xlink:href="resources/icons/sprite.svg#${formatWindDirIcon(formatWind(data.wind_cdir_full))}"></use>
            </svg>
            <span class="data__title">Wind direction</span>
            <span class="data__in data__in--wdirection">${formatWind(data.wind_cdir_full)}</span>
        </li>

        <li class="data__item">
            <svg class="data__icons">
                <use xlink:href="resources/icons/sprite.svg#weather_drop"></use>
            </svg>
            <span class="data__title">Humidity</span>
            <span class="data__in data__in--humid">${data.rh}%</span>
        </li>

        <li class="data__item">
            <div class="data__icon-box">
                <svg class="data__icons">
                    <use xlink:href="resources/icons/sprite.svg#weather_sunset"></use>
                </svg>
                <svg class="data__icons">
                    <use xlink:href="resources/icons/sprite.svg#weather_sundown"></use>
                </svg>
            </div>
            <span class="data__title">Sunrise/set</span>
            <span class="data__in data__in--minmax">${formatSunriseSetTime(data.sunrise, data.sunset)}</span>
        </li>

        <li class="data__item">
            <svg class="data__icons">
                <use xlink:href="resources/icons/sprite.svg#weather_sun"></use>
            </svg>
            <span class="data__title">UV index</span>
            <span class="data__in data__in--uv">${Math.round(data.uv)}</span>
        </li>

        <li class="data__time">Last observation time: ${data.ob_time}</li>
    `;
    elements.details.insertAdjacentHTML('afterbegin', markUp);
}

const renderForecast = (day, curDay = 0) => {
    const markUp = `
    <li class="data__item-f swiper-slide">
        <span class="data__title-f"><span class="data__title-f data__title--day">${convertToWeekday(day.valid_date)}</span></span>
        <svg class="data__icons-f">
            <use xlink:href="resources/icons/sprite.svg#${day.weather.icon}"></use>
        </svg>
        <span class="data__title-f data__condition-f">${limitDes(day.weather.description)}</span>
        <span class="data__in-f data__in-f--0">${day.high_temp}&deg; / ${day.min_temp}&deg;</span>
    </li>
    `;
    elements.forecast.insertAdjacentHTML('beforeend', markUp);
}

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
}

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
    }

    elements.hint.innerHTML = "";
}


export const addSwiper = () => {
    $(document).ready(function() {
        var swiper = new Swiper('.data__forecast', {
            slidesPerView: 7,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
                // breakpoints: {
                //     640: {
                //       slidesPerView: 2,
                //       spaceBetween: 20,
                //     },
                //     768: {
                //       slidesPerView: 4,
                //       spaceBetween: 40,
                //     },
                //     1024: {
                //       slidesPerView: 5,
                //       spaceBetween: 50,
                //     },
                //   }
        });
    })
}