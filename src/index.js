import "./styles.css";
import { getRequiredData, requestWeather } from "./weatherAPI.js";
import { render, getSearchInput, initSearch, initToggle, getUnitInput, loadingAnimation } from "./dom.js";
import mockWeatherData from "./mockWeatherData.js";

const USE_MOCK = false;

async function init() {
    loadingAnimation.showModal();
    try {
        let location = getSearchInput();
        let unit = getUnitInput();
        const reqData = USE_MOCK
            ? mockWeatherData
            : getRequiredData(await requestWeather(location, unit));
        render(unit, reqData);
    } finally {
        loadingAnimation.close();
    }
}

init();
initSearch(handleSearchSubmit);
initToggle(handleUnitToggle);

function handleSearchSubmit(){
    init();
}

function handleUnitToggle(){
    init();
}
