import Search from './models/Search';
import History from './models/History';
import { elements } from './views/base';
import * as searchView from './views/searchView';

/**********************************
 *        Global app state        *
 *********************************/

const state = {
    /**
     * Search object
     * Current location
     * Current w-conditions
     * Main data
     * W-details
     * Forecast data
     * Metric units
     * Language
     */
}

window.s = state;

const controlSearch = async () => {
    // Location
    const location = searchView.getInput();
    
    if (location) {
        // Search object
        state.search = new Search(location);

        // Prepare UI for results
        prepareUI();

        try {
            // Get main data for location
            await state.search.getResults();

            // Get forecast data for location
            await state.search.getForecast();

            // Render data on UI 
            searchView.renderData(state.search.data, state.search.forecast, state.search.lang);

            // Add UI elements
            addElements();
        } catch(error) {
            console.log(error);
        }
    }
}

const prepareUI = () => {
    searchView.renderSuggestion();
    searchView.clearInput();
    searchView.clearLocation();
    searchView.clearConditions();
    searchView.clearMain();
    searchView.clearDetails();
    searchView.clearForecast();
    searchView.renderHint();
    searchView.renderBtns();
}

const addElements = () => {
    searchView.renderHint('r');
    searchView.addSwiper();
    searchView.renderBtns('r');
}

// **** UPDATE WEATHER ****

const updateWeather = async searchPrev => {
    if (searchPrev) {
        try {
            // Render data on UI 
            searchView.renderData(searchPrev.data, searchPrev.forecast, searchPrev.lang);
            
            // Add elements
            addElements();
        } catch(error) {
            console.log(error);
        }
    }
};

elements.updateBtn.addEventListener('click', () => {
    if (state.search) {
        prepareUI();
        updateWeather(state.search);
    }
});

// **** ADD TO HISTORY ****

const controlHistory = async () => {
    try {
        if (!state.history) state.history = new History();
        // const id = state.search.id;
        
        if (!state.history.inHistory(state.search.location)) {
            const newItem = await state.history.addHistory(state.search.location, state.search.data, state.search.forecast, state.search.id);
        }
        // console.log(localStorage.getItem('history'));
    } catch(error) {
        console.log(error);
    }
}

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch()
    .then(setTimeout(() => {
        controlHistory();
    }, 5000));
});

// **** CLEAR CONTENT ****

elements.clearBtn.addEventListener('click', () => {
    searchView.clearAll();
});
