import { elements } from './views/base';
import Search from './models/Search';
import History from './models/History';
import * as Language from './models/Language';
import * as searchView from './views/searchView';
import * as historyView from './views/historyView';
import * as langView from './views/langView';


/**********************************
 *        Global app state        *
 *********************************/

const state = {
    /*
     * Current location
     * Main data
     * Forecast data
     * ID
     * Metric
     * Language
     */
}

window.s = state;

const controlSearch = (location = searchView.getInput()) => {
    
    // Get input
    // const location = searchView.getInput();
    
    if (location) {
        // Save search in the global object
        state.search = new Search(location, 'M', Language.lang);

        // Prepare UI
        searchView.prepareUI();

            setTimeout(async () => {
                try {
                    // Get main data for location
                    await state.search.getMainData();
        
                    // Get forecast for location
                    await state.search.getForecast();
                    
                    setTimeout(() => {
                        // Render data on UI
                        searchView.renderSpinner();
                        searchView.renderData(state.search.data, state.search.forecast, state.search.lang);

                        // Add/Remove UI elements
                        searchView.addUIElements(false);

                        // Translate content
                        langView.translateContent();

                        updateAllowed = true;
                        updateOn = 1;
                    }, 2000)

                } catch(error) {
                    console.log(error);
                }
            }, 500);
    }
};

/**********************************
 *           MAIN SEARCH          *
 *********************************/

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();

    // Perform Search
    controlSearch();

    // Record history
    setTimeout(() => {
        // Create recent search list and save to storage
        controlHistory();
    }, 4500);

    // Remove focus
    elements.searchField.blur();

    // Display ID
    window.location.hash = state.search.id;
});

/**********************************
 *             CLEAR              *
 *********************************/

[elements.clearBtn, elements.clearMobile].forEach(el => {
    el.addEventListener('click', () => {
        if (state.search) searchView.clearAll(state.search.lang);
        state.search = undefined;
        window.location.hash = '';
    });
})

/**********************************
 *            UPDATER             *
 *********************************/

let updateOn = 1;
let updateAllowed = false;

const updater = [elements.updateBtn, elements.updateMobile];

updater.forEach(el => {
    el.addEventListener('click', () => {
        if (state.search && updateAllowed && updateOn == 1) {
            // console.log('clicked')d
            // searchView.clearAll('')
            // setTimeout((state) => {
                updateOn = 0;
                controlSearch(state.search.location);
            // }, 1000, state.search.location); 
        };
    });
});

// const updateFix = () => {
//     if (updateAllowed) updateAllowed = false
//     else updateAllowed = true;
// }

/**********************************
 *            HISTORY             *
 *********************************/

const controlHistory = async () => {
    try {
        if (!state.history.inHistory(state.search.location) && state.search.location !== undefined) {
            await state.history.limitHistory(state.search.location, state.search.country, state.search.id);

            // Render history list
            historyView.renderRecentList(state.history.history, state.history.countHistory(), false);
        }
    } catch(error) {
        console.log(error);
    }
};

window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    const id = hash.split('#')[1];
    console.log(id);
    if (state.history.history.length !== 0 && window.location.hash !== '') {

        // Find the search on pick
        const index = state.history.history.findIndex(el => el.id === id);
        const location = state.history.history[index].location;
        controlSearch(location);
    };
});


/**********************************
 *             PRINT              *
 *********************************/

elements.printBtn.addEventListener('click', () => {
    if (state.search) $(".data").print();
});

/**********************************
 *             ON LOAD            *
 *********************************/

window.addEventListener('load', () => {
    // Create history record
    if (!state.history) state.history = new History();

    // Read storage
    state.history.readHistory();

    // Render history list on load
    historyView.renderRecentList(state.history.history, state.history.countHistory(), true);

    // Remove previous view location
    window.location.hash = '';

    // Read language
    Language.getLangOnLoad();

    // Attach language handler
    Language.getLang();
});

let utcTimeZone = new Date().getTimezoneOffset() / 60;
console.log(`TIMEZONE : ${utcTimeZone}`);
